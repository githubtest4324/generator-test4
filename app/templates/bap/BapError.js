module.exports = function BapError(messageParam, pathParam){
    this.type = 'error';
    this.message = messageParam;
    this.path = pathParam;
    this.toString = function(){
        return 'Error at '+this.path+': '+this.message;
    }
}