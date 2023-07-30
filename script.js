window.onload= function(){

    // if the user tries to access the profile html but user is not logged in
    if(window.location.pathname=="/profile.html" && !localStorage.getItem("accessToken")){
        window.location.href='index.html';
    }

    // if the user is trying to access the signup page but user is logged in
    if(window.location.pathname=="/index.html" && localStorage.getItem("accessToken")){
        window.location.href="profile.html";
    }
    // If the user is not loggged in is trying to sign up
    if(window.location.pathname=="/index.html"){
        const form=document.getElementById("signupForm");
        form.addEventListener("submit",function(e){
            e.preventDefault();
            let username=document.getElementById('username');
            let email=document.getElementById('email');
            let password=document.getElementById('password');
            let confirmpassword=document.getElementById('confirmpassword');
            console.log(username.value,email.value,password.value,confirmpassword.value);

            let array=new Uint8Array(16);
            // This line creates a new array of 16 random numbers,
            //  Each number can be anything from 0 to 255
            console.log("step 1",array);
            window.crypto.getRandomValues(array);
            // This line user inbuilt system to generate 16 random numbers
            // making sure they are really random
            //We then add these random numbers in the array
            // 0 to 255
            console.log("step 2",array);
            let accessToken=Array.from(array,b=>b.toString(16).padStart(2,"0")).join("");
            //b.toString(16)-> changes each number in the array into a string with base 16 (a-z and 0-9)
            // padStart(2,"0"))-> add a zero at the start of the number if it is a single digit
            // join("") converts array to concatenated string
            console.log("Step 3",accessToken);

            let user={
                username:username.value,
                email:email.value,
                password:password.value,
                confirmpassword:confirmpassword.value,
                accessToken:accessToken
            }

            localStorage.setItem("user",JSON.stringify(user));
            localStorage.setItem("accessToken",JSON.stringify(accessToken));

            setTimeout(function(){
                window.location.href="profile.html";
            },1000);
        })
    }else if(window.location.pathname=="/profile.html"){
        let user=JSON.parse(localStorage.getItem("user"));
        let profiletext=`
        <p id="card-username">Full Name: ${user.username}</p>
        <p id="card-email">Email: ${user.email}</p>
        <p id="card-token">Token: ${user.accessToken}</p>
        <p id="card-password">Password: ${user.password}</p>`;
        document.getElementById("profile-info").innerHTML=profiletext;

        let logoutbtn=document.getElementById('logout-btn');
        logoutbtn.addEventListener('click',function(){
            localStorage.clear();
            document.getElementById('message').innerText="logging out";
            setTimeout(function(){
                window.location.href="index.html";
    
            },2000);
        })
    }
}