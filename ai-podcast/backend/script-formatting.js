import scriptGen from './script-gen.js';

// let script;
// scriptGen().then(op =>{
//     script = op;
//     console.log(script);
// })

let script = `**Intro (0:00-0:15)**

Host A: Hello and welcome to TechForward, the podcast that explores the cutting edge of technology. I'm your host, Mark Johnson.

Host B: And I'm Sarah Chen, joining Mark today to delve into a topic that's transforming our world – Artificial Intelligence, or AI.

**Conversation (0:15-2:45)**

Host A: Sarah, AI is everywhere, isn't it? From self-driving cars to personalized recommendations on our streaming services.  It’s remarkable how quickly it's advanced.

Host B: Absolutely, Mark. And the pace of development is only accelerating.  What strikes me is how much AI is already subtly integrated into our daily lives. Think about spam filters, voice assistants, even the autocorrect on our phones – all powered by AI algorithms.

Host A:  Exactly.  But  I think a lot of people still misunderstand what AI actually *is*.  It’s not about sentient robots taking over the world, at least not yet!  It's about creating systems that can learn, reason, and solve problems – often better than humans in specific tasks.       

Host B:  That's a crucial point.  We need to move beyond the science fiction stereotypes.  The real concerns are more nuanced.  Things like algorithmic bias, job displacement, and the ethical implications of using AI in areas like surveillance or healthcare.

Host A:  You're right.  Ensuring fairness and accountability in AI development is paramount.  We need regulations and guidelines to prevent misuse and protect against potential harms.  The debate about AI regulation is going to be huge in the years to come.

Host B: I agree.  It's a complex issue with no easy answers.  But the potential benefits are also enormous.  AI could revolutionize healthcare, accelerate scientific discovery, and address some of the world's most pressing challenges, like climate change.


**Conclusion (2:45-3:00)**

Host A: So, while we need to be mindful of the risks,  the future of AI is undeniably exciting and full of possibilities.

Host B:  Indeed.  Thanks for joining us on TechForward today.  We’ll be back next week with another fascinating tech topic.

Host A:  Until then, keep exploring the tech world around you.`;

script = script.split("\n");
console.log(script[0]);

let hostA = [];
let hostB = [];
script.forEach((item)=>{
    if(item.includes("Host A:")){
        hostA.push(item);
    }else if(item.includes("Host B:")){
        hostB.push(item);
    }
})

console.log(hostA);
console.log(hostB);

export default {hostA, hostB};