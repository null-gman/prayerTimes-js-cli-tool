/* # getFlgaes.js :
1. get the process.argv flages like : "-name null" and put them in object key:value .
2. example :{name:"null",... : "..."}
3. export : the flages object

*/
function getFlages() {
  const ARGV = [...process.argv] ;
  const ARGV_LEN = ARGV.length;
  const FlagesObj = {};

  let flageKey = "";
  let flageValue = "";

  for (let index = 0; index < ARGV_LEN; index++) {
    if ( ARGV[index][0] !== '-') {
      continue;
    }
    if( ARGV[index+1] && ARGV[index + 1][0] === '-') {
      continue;
    }

    flageKey = String(ARGV[index]).slice(1); /*remove "-" from the flage key */
    flageKey = flageKey.toLocaleLowerCase(); /*no case sensitivity flages */

    flageValue = ARGV[index + 1] ?? null;

    FlagesObj[flageKey] = flageValue;
    
  }

  return FlagesObj;
}




const FLAGES_OBJ = getFlages();

export default FLAGES_OBJ;
