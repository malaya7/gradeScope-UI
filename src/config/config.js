const NODE_ENV = process.env.NODE_ENV;
console.log("NODE_ENV:", NODE_ENV);  

const prodUrl = 'aws';
const devUrl = 'localhost:8000'

const baseUrl = NODE_ENV === 'production' ? prodUrl : devUrl;

const API_URLS = {
    getCourses: `${baseUrl}/courses`,
    getAssignments: `${baseUrl}/courses/assignments`,
};

  export default API_URLS;
