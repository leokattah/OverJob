export default function description ({job}){
 return <h1>description</h1>
}

export async function getStaticPaths(){
  return {
    path: [ ],
    fallBack: true,
  }
}

export async function getStaticProps({ params: {id} }){

const {data} = await axios.get('http://localhost:3000/api/jobs?secret=over');
return {
  props: {
    job: data.jobs
  }}}