const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

  const dropdowns=document.querySelectorAll("select");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const btn = document.querySelector("button");
  const result=document.querySelector(".result p")

  for(let select of dropdowns)
  {
    for(country in countryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=country;
        newOption.value=country;
        select.append(newOption);
        if(select.name==="from" && country==="USD")
        {
            newOption.selected="selected";
        }
        if(select.name==="to" && country==="INR")
        {
            newOption.selected="selected";
        }
    }

    select.addEventListener("change",(evt) => {
        updateflag(evt.target);
    })
  }

  


  const updateflag = (element) => {
    let ctrycode=element.value;
    let codi=countryList[ctrycode];
   let img=element.parentElement.querySelector("img");
   let imgsrc=`https://flagsapi.com/${codi}/flat/64.png`;
   img.src=imgsrc;
  }

  const converter =async() =>{
    let amt=document.querySelector(".amount input");
   let amtVal=amt.value;
   if(amtVal==="" || amtVal<1)
   {
    amtVal=1;
    amt.value="1";
   }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  result.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`; 
  console.log(finalAmount);
//   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  }

  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    converter();
  });