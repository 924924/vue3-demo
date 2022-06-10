export default{
    threeData:function (data) {
        let list=[];
        for(let item of data){
            if(item.level==="ONE"){
                list.push(item);
            }
        }
        for(let cate of list){
            cate.children=[];
            for(let item of data){
                if(item.level==="TWO"){
                    if(item.parentId===cate._id){
                        item.value=item._id;
                        item.label=item.name;
                        cate.children.push(item);
                    }
                }
            }
        }
        for(let cate of list){
            for(let child of cate.children){
                child.children=[];
                for(let item of data){
                    if(item.level==="THREE"){
                        if(item.parentId===child._id){
                            item.value=item._id;
                            item.label=item.name;
                            child.children.push(item);
                        }
                    }
                }
            }
        }
        return list;
    }
}

