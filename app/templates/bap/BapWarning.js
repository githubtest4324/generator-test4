var JsonUtils = require('./utils/JsonUtils');

module.exports = function BapWarning(messageParam, pathParam){
    this.type = 'warning';
    this.message = messageParam || '';
    this.path = pathParam || [];
    this.toString = function(){
        return 'Warning at '+JsonUtils.pathToString(this.path)+': '+this.message;
    };
};