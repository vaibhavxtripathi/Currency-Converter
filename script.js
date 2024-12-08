const flagURL = "https://flagsapi.com/US/flat/64.png"
const select = document.querySelectorAll("select")
const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const form = document.querySelectorAll("form")

for (let option of select) {
    for (country in countryList) {
        // console.log(country,countryList[country])
        let newOptions = document.createElement("option")
        newOptions.innerText = country
        newOptions.value = country
        if (option.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (option.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        option.append(newOptions)
    }
    option.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

const updateFlag = (element) => {
    // for (let i = 0; i < img.length; i++) {
    //     img[i].src = `https://flagsapi.com/${countryList[element.value]}/flat/64.png`
    // }
    let img = element.parentElement.querySelector("img")
    img.src = `https://flagsapi.com/${countryList[element.value]}/flat/64.png`
    //element choose kiya because element = evt.target, aur evt ho raha hai individual option me aur uska target wo return kar raha hai aur baaki koi method aisa nahi hai kuch khaas

    //const use kiya instead of function updateflag(), taaki humein manually call na karna pade function ko aur aise variable banake wo autocall ho jayega
}
window.addEventListener("load", function convert() {

    document.querySelector(".btn").addEventListener("click", async (event) => {
        const toCurrency = document.querySelector(".to select").value.toLowerCase() //iss value ko eventlistener ke andar lena hai, varna wo dynamically update nahi hogi obviously
        const fromCurrency = document.querySelector(".from select").value.toLowerCase()
        const url = `${baseUrl}/${fromCurrency}.json`;
        event.preventDefault() //default jo bhi behaviors hain (form submit karne ki button ki) usko hata dega pura aur clean template de dega to work on
        let amount = document.querySelector("input").value
        if (amount === "" || amount < 0) {
            amount = 1;
        }
        let response = await fetch(url)
        let data = await response.json()
        let rate = data[fromCurrency][toCurrency]
        console.log(rate);
        let msg = document.querySelector(".finalValue p")
        let finalAmtValue = amount * rate
        let roundValue = finalAmtValue.toFixed(2)
        let decimalValue = finalAmtValue.toString().indexOf(".");
        let subValue = finalAmtValue.toString().substring(decimalValue + 1);
        console.log(subValue);
        let lightColor = document.createElement("span")
        lightColor.style.color = "#a1a6b0"
        lightColor.innerText = subValue
        // msg.appendChild(lightColor)
        // msg.innerHTML = `${amount} ${fromCurrency.toUpperCase()} = ${roundValue}${lightColor.innerText} ${toCurrency.toUpperCase()}`;
        msg.innerHTML = `${amount} ${fromCurrency.toUpperCase()} = ${roundValue}`;
        msg.appendChild(lightColor); // Append the styled element to the msg container 
        //without append it just creates, par apply tabhi hoga jab DOM me append karoge
        msg.innerHTML += ` ${toCurrency.toUpperCase()}`;
    })
})

// async function Convert(){
//     let data = fetch(url)
//     let rate = (await data).json()
//     console.log(rate);
// }

//Triggering "Convert" by pressing 'Enter' on input

form.addEventListener("keypress", (evtt) => {
    console.log(evtt.key);
    if (evtt.key === 'Enter'){
        // evtt.preventDefault();
        form.submit();
    }
})


