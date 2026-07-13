
"use client";

export default function Unauthorized(){
    return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold">401 - Unauthorized</h1>
        <p>You are not authorized to access this page.</p>
      </div>
    </div>
    );
}