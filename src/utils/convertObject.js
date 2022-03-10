module.exports={
    multipleToObject:function(arr){
        return arr.map(singleValue=>singleValue.toObject());
    },
    singleToObject:function(val){
        return val? val.toObject() : val;
    }
}