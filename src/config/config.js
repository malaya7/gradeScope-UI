const NODE_ENV = process.env.NODE_ENV;
console.log("NODE_ENV:", NODE_ENV);  

const prodUrl = 'aws';
const devUrl = 'http://localhost:8000'

const baseUrl = NODE_ENV === 'production' ? prodUrl : devUrl;

const idFromLink = (s) => {
   const i = s.lastIndexOf('/');
   return s.substr(i + 1);
};

const data = {
  data:[
     0.0,
     24.0,
     20.0,
     24.0,
     0.0,
     11.0,
     1.999,
     26.0,
     0.0,
     22.0,
     26.0,
     22.0,
     1.0,
     26.0,
     5.0,
     22.0,
     16.999,
     24.0,
     6.0,
     7.0,
     5.0,
     7.0,
     22.0,
     2.0,
     24.0,
     13.0,
     5.0,
     17.0,
     22.0,
     22.0,
     9.0,
     24.0,
     26.0,
     26.0,
     5.0,
     22.0,
     21.0,
     4.0,
     7.0,
     5.0,
     9.0,
     16.0,
     8.0,
     7.0,
     24.0,
     4.0,
     0.0,
     24.0
  ],
  max: "50"
}
const buildGraph = (data, sz=2) => {
 const res = [];
 if(data && data.data && data.data.length) {
  const scores = data.data.join(',')
  let numsArray = scores.split(',').map(Number);
  numsArray = numsArray.sort((a, b) => a - b);

  const max = numsArray[numsArray.length-1]; // || parseInt(data.max) || 50;
  let prev = 0;
  for(let i = sz; i <= max; i += sz) {
   res.push([`${prev}-${i-1}`, numsArray.filter(x => x >= prev && x < i).length])
   prev = i;
   // numsArray = numsArray.filter(x => x > i);
  }
  res.push([`${max}`, numsArray.filter(x => x === max).length])
 }
 
console.log(res);
return res.length ? res : null ;
}

const API_URLS = {
    base: baseUrl,
    getCourses: `${baseUrl}/courses`,
    getAssignments: `${baseUrl}/courses/id/assignments`,
    idFromLink,
    buildGraph,
};

  export default API_URLS;
