// lib/serverWakeup.js
export async function wakeupBackendServer() {
    try{
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL!);
      const data=await res.text();
      console.log('Backend server response: ',data);
      return true;
    }catch(err){
      console.error("Failed to start:", err);
    };
}