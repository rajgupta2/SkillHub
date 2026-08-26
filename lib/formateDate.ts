export const formateDate=(createdAt:string)=>{
  const stringDate=  new Date(createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  return stringDate;
}