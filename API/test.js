const neo4j = require('neo4j-driver')



async function main(){
	const driver = neo4j.driver("bolt://104.43.232.156:7687/", neo4j.auth.basic("neo4j", "1234"))
	const session = driver.session()
	// const personName = 'Alice'
	console.log("iniciando ");
	try {
	  console.log("conectando ");
	  const result = await session.run(
	    'CREATE(e1:Empleado {nombre:"betolan2", rol:"programador"})'
	    // { name: personName }
	  )

	//   const singleRecord = result.records[0];
	//   const node = singleRecord.get(0);

	//   console.log(node.properties.name);

	  await session.close();
	  console.log("termino 1");

	} catch(error)  {
	  console.log(error);
	}

	// on application exit:
	await driver.close();
}

main();
