export function formatSize(size : number){
    if(size >= 1000){
      return size / 1000 + "GB"
    }else{
      return size + "MB"
    }
  }