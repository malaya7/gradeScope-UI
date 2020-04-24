const NODE_ENV = process.env.NODE_ENV;
console.log("NODE_ENV:", NODE_ENV);  

const prodUrl = 'aws';
const devUrl = 'http://localhost:8000'

const baseUrl = NODE_ENV === 'production' ? prodUrl : devUrl;

const API_URLS = {
    base: baseUrl,
    getCourses: `${baseUrl}/courses`,
    getAssignments: `${baseUrl}/courses/id/assignments`,
};

  export default API_URLS;
