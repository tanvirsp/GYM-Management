import moment from 'moment';


const IsExpired = (isoDate ) =>{
  
 
  if( isoDate === undefined ){
    return false
  } else {
    const currentDate = moment().format().split("T")[0];
    
    const lastDate = isoDate.split("T")[0];

    return currentDate <= lastDate ;
  }
  
    
}

export default  IsExpired