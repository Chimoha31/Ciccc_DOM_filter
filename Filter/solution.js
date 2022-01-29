const API_URL = "https://randomuser.me/api?results=50";
const filter = document.getElementById("filter");
const result = document.getElementById("result");
const header = document.querySelector("header");

async function getData() {
  const response = await fetch(API_URL);
  const { results } = await response.json();
  console.log(results[0]);

  //clear result
  result.innerHTML = "";

  const div = document.createElement("div");
  results.map((eachPerson) => {
    // liを作成
    const li = document.createElement("li");
    // divに付随
    div.appendChild(result).appendChild(li);
    // 各写真を取得し格納
    let picture = eachPerson.picture.medium;
    // imgに付随
    let imgTag = document.createElement("img");
    imgTag.setAttribute("src", picture);
    li.appendChild(imgTag);
    //各名前
    let firstName = eachPerson.name.first;
    let lastName = eachPerson.name.last;
    let fullName = `${firstName} ${lastName}`;
    let h3 = document.createElement("h3");
    h3.textContent = fullName;
    li.appendChild(h3);
    // location
    let country = eachPerson.location.country;
    let city = eachPerson.location.city;
    let p = document.createElement("p");
    p.textContent = country + ", " + city;
    li.appendChild(p);

    // 人物Search
    filter.addEventListener("keyup", function (e) {
      let searchWord = e.target.value.toLowerCase();
      const allLi = document.querySelectorAll("li");

      Array.from(allLi).forEach((li) => {
        let perText = li.children[1].textContent;
        console.log(perText);

        if (perText.toLocaleLowerCase().indexOf(searchWord) !== -1) {
          li.style.display = "block";
        } else {
          li.style.display = "none";
        }
      });
    });
  });
  console.log(div);
  header.after(div);
}
getData();
