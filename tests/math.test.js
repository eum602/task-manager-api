const {calculateTip , fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../src/math')
test('Should calculate total with tip', ()=>{
    const total = calculateTip(10,0.3)
    // if(total!==13){
    //     throw new Error(`Total should be 13. Got ${total}`)
    // }
    expect(total).toBe(13)
})

test('Should calulate total with default tip',()=>{
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Should convert 32°F to 0°C', ()=>{
    const c = fahrenheitToCelsius(32)
    expect(c).toBe(0)
})

test('Should convert 0°C to 32°F', ()=>{
    const f = celsiusToFahrenheit(0)
    expect(f).toBe(32)
})
//Why test
//Saves time
//Creates reliable code
//Gives flexibility to developers
//  -Refactoring
//  -Collaborating
//  -Profiling
//Peace of mind

test('Async test demo', done => {
    setTimeout(()=>{
        expect(1).toBe(1)
        done() //To solve that we can use a variable as a parameter 
        //so that at the end we call it in order to tell jest the 
        //async function has finished
    },2000)    
})

test('Should add two number - promises',done=>{
    add(2,3).then(sum=>{
        expect(sum).toBe(5)
        done()
    })   
})

test('should add two numbers async/await',async (done) => {
    const sum =  await add(5,6)
    expect(sum).toBe(11)
    done()
})