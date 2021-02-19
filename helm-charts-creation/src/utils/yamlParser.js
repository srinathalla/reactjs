import yaml from "js-yaml";
import {
    deploymentTemplate
} from "../helm_templates/templates"

export function parseApplicationYaml(content) {
    let data = yaml.safeLoadAll(content);
    data = data[0];
    return data
}

export function generateHelmYamls(content) {
    let data = yaml.safeLoadAll(content);
    data = data[0];
    let envParams = {};
    walkDictionary(data, envParams);

    let env = yaml.safeDump(envParams)
    let values = generateValuesYaml(envParams);
    let configmap = generateConfigMapYaml(envParams);
    let deployment = generateDeploymentYaml(envParams);


    return {
        env,
        values,
        configmap,
        deployment
    }
}

function generateDeploymentYaml(envParams) {

    let deploymentYaml = {
        "env": []
    }

    for (let key of Object.keys(envParams)) {
        let param = {};
        let cmr = {};
        param["name"] = key;
        param["valueFrom"] = {
            "configMapKeyRef": cmr
        };
        cmr["name"] = '{{ include "sto-web.fullname" . }}'
        cmr["key"] = toConfigMapKey(key);
        deploymentYaml.env.push(param);

    }

    return yaml.safeDump(deploymentYaml);
}

function toConfigMapKey(key) {
    return key.toLowerCase().replace(/_/g, '-');
}

function generateConfigMapYaml(envParams) {
    let configmap = {}

    for (let key of Object.keys(envParams)) {
        let name = key.toLowerCase();
        name = name.replace(/_/g, '-');
        let value = toCamelCase(key);
        configmap[name] = `{{ .Values.config.${value} | quote }}`;
    }
    return yaml.safeDump(configmap);
}

function generateValuesYaml(envParams) {
    let values = {}
    for (let [key, value] of Object.entries(envParams)) {
        key = toCamelCase(key);
        values[key] = value;
    }
    return yaml.safeDump(values);
}

function toCamelCase(input) {
    input = input.toLowerCase();
    let inputArray = input.split('_');
    let firstWord = inputArray.splice(0, 1)[0];
    inputArray = inputArray.map(w => w.substring(0, 1).toUpperCase() + w.substring(1));
    input = inputArray.join("");
    return firstWord + input;
}




function walkDictionary(data, envParams) {
    for (const [k, v] of Object.entries(data)) {
        if (typeof v === "object") {
            walkDictionary(v, envParams);
        } else {
            if (typeof v === "string" && v.indexOf('$') > -1) {

                let name = v.substring(v.indexOf('{') + 1, v.indexOf(':'));
                let value = v.substring(v.indexOf(':') + 1, v.length - 1);
                value = parse(value)
                envParams[name] = value
            }
        }
    }
}

function parse(value) {
    if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
        return value.toLowerCase() === "true"
    }
    if (!isNaN(value)) {
        return parseInt(value);
    }
    return value
}