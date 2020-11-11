class Foods{
    constructor(){
        this.image = loadImage("Milk.png");
        
    }
    display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
    getFoodStock(){
        var foodRef = database.ref('Food');
        foodRef.on("value",function(data){
        foodRef = data.val();
})
    }

    updateFoodStock(count){
        database.ref('/').update({
            Food: count
        });
    }

    deductFood(count){
        var Food = "food" - Food;
        database.ref(Food).set({
        Food:count
        });
    }

    bedroom(){
        background(bedroom,550,500)
    }

    garden(){
        background(garden,550,500);
    }

    washroom(){
        background(washroom,550,500);
    }
}