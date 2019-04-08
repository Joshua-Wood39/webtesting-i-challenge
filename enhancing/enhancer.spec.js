const { succeed, fail, repair, get } = require('./enhancer.js');

const item = {
    name: '',
    enhancement: 0,
    durability: 0
}

const longsword = Object.create(item);
longsword.name = "Longsword";
longsword.enhancement = 5;
longsword.durability = 80;

const bastardsword = Object.create(item);
bastardsword.name = "Bastard Sword";
bastardsword.enhancement = 20;
bastardsword.durability = 75;

// test away!

// repair should return with durability 100
it('Longsword durability to 100', () => {
    expect(repair(longsword)).toEqual({name: "Longsword", enhancement: 5, durability: 100 });
    console.log("repair: ", longsword);
})

// enhancement should return with enhancement + 1
it('Longsword enhancement to 6', () => {
    expect(succeed(longsword)).toEqual({name: "Longsword", enhancement: 6, durability: 100});
    console.log("succeed: ", longsword);

    // enhance of 20 does not increment
    expect(succeed(bastardsword)).toEqual({name: "Bastard Sword", enhancement: 20, durability: 75});
    console.log("succeed", bastardsword);
})

// fail should return durability -5 (<15enhance)
// fail should return enhancement -1 (>16) and durability -10(>16enhance)
it('Longsword enhance: 6, dur: 95', () => {
    expect(fail(longsword)).toEqual({name: "Longsword", enhancement: 6, durability: 95 });
    console.log("fail: ", longsword);
    
    // enhance 20 => 19, durability -10
    expect(fail(bastardsword)).toEqual({name: "Bastard Sword", enhancement: 19, durability: 65 });
    console.log("fail: ", bastardsword);
}) 

// get should return name: '[enhancement] item.name'
it('should add enhancement to name', () => {
    expect(get(bastardsword)).toEqual({ name: "[+19] Bastard Sword", enhancement: 19, durability: 65 });
    console.log("get: ", bastardsword);
})