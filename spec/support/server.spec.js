var request =require('request');

describe("calc",()=>{
    it("should multiply 2 and 2",()=>{
        expect(2*2).toBe(4)
    })
})

describe("get messages",()=>{
it("should return 200 ok",(done)=>{
    request.get("http://localhost:3000/messages",(err,res)=>{
       console.log(res.body)
        expect(res.statusCode).toBe(200);
        done();
    })
    
})

it("should return a list ,that's not empty",(done)=>{
    request.get("http://localhost:3000/messages",(err,res)=>{
        // console.log(JSON.parse(res.body)[0]);
        expect(JSON.parse(res.body).length).toBeGreaterThan(0);
        done();
    })
    
})

})

describe("get messages from user",()=>{
    
    it("should be return 200 ok",(done)=>{
        request.get("http://localhost:3000/messages/aloha2",(err,res)=>{
           console.log(res.body)
           expect(res.statusCode).toBe(200);
           done();
        })
        
    })

    it("name should be new",(done)=>{
        request.get("http://localhost:3000/messages/new",(err,res)=>{
            // console.log(JSON.parse(res.body));
           expect(JSON.parse(res.body).name).toEqual("new");
           done();
        })
        
    })
    })

