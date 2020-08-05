const fs = require("fs");
const objectPath = require("object-path");
const ini = require("ini");

class Config{
    constructor(strategy){
        this.data = {};
        this.strategy = strategy;
    }

    get(path){
        return objectPath.get(this.data, path);
    }

    set(path, value){
        return objectPath.set(this.data, path, value);
    }

    read(file){
        console.log(`Deserializing from ${file}`);
        this.data = this.strategy.deserizlize(fs.readFileSync(file, 'utf-8'));
    }

    save(file){
        console.log(`Serializing to ${file}`);
        fs.writeFileSync(file, this.strategy.serialize(this.data));
    }
}

const jsonStrategy = {
    deserialize: data => JSON.parse(data),
    serialize: data => JSON.stringify(data, null, '  ')
}

const iniStrategy = {
    deserialize: data => ini.parse(data),
    serialize: data => ini.stringify(data)
}

const jsonConfig = new Config(jsonStrategy);
jsonConfig.read('conf.json');
jsonConfig.set('book.nodejs', 'design patterns');
jsonConfig.save('conf_mod.json');

const iniConfig = new Config(iniStrategy);
iniConfig.read('conf.ini');
iniConfig.set('book.nodejs', 'design patterns');
iniConfig.save('conf_mod.ini');