document.addEventListener("DOMContentLoaded", function () {
  let dee = document.querySelectorAll('.npc-wrapper li');
  let leftWrapper = document.querySelector('.left-wrapper');
  let csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;
  let ulElement = document.querySelector(".ulElement");
  let ulElDiffPlatforms = document.querySelector(".ulElDiffPlatforms");
  let domainBoxParent = document.querySelector(".wrapper-suggestion");
  let blankSuggestion = document.querySelector(".blank-domain-suggestion");
  let domainSuggestionEngine = document.querySelector("#domain-suggestion-engine");
  
  // Suggest Engine

  document.querySelector("#s-form").addEventListener("submit", (e) => {
    e.preventDefault(); 
    let faSpinner = document.querySelector(".fa-spinner-g");
    faSpinner.classList.remove("feature-hidden");
    let t = document.querySelector("#prompt").value;
    const r = document
      .getElementById("radio-group")
      .querySelector('input[type="radio"]:checked');
    fetch("/suggestion-engine/", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRFToken": csrfToken },
      body: JSON.stringify({
        data: t,
        first_number: document.querySelector("#number11").value,
        last_number: document.querySelector("#number22").value,
        radioExtension: r.value,
      }),
    })
      .then((e) => e.json())
      .then((e) => {
        faSpinner.classList.add("feature-hidden");
        let t = document.querySelectorAll(".domain-box");
        if (t) for (let e = 0; e < t.length; e++) t[e].remove();
        let o = document.createElement("div");
        if (
          ((o.className =
            "domain-box lg:w-[30%] w-[90%] bg-white mx-auto lg:mx-0 mt-4 bg-white rounded-lg shadow-lg cursor-pointer select-none relative"),
            0 === e.result.length)
        ) {
          let e = document.createElement("p");
          document
            .querySelector(".blank-domain-suggestion")
            .classList.add("feature-hidden"),
            e.classList.add("text-center-assist"),
            (e.innerText = `No .${r.value} domains found! Try again.`),
            o.appendChild(e),
            (document.querySelector(".domain-box").style.background = "#cd1515"),
            (document.querySelector(".domain-box").style.color = "white"),
            (document.querySelector(".domain-box").style.padding = "3rem"),
            domainBoxParent.prepend(o),
            (domainBoxParent.querySelector(".domain-box").style.background =
              "#cd1515"),
            (domainBoxParent.querySelector(".domain-box").style.color = "white"),
            (domainBoxParent.querySelector(".domain-box").style.padding = "3rem"),
            domainBoxParent.scrollIntoView({ behavior: "smooth" });
        } else
          for (let t = 0; t < e.result.length; t++) {
            let r = document.createElement("div");
            (r.className =
              "domain-box lg:w-[30%] w-[90%] bg-white mx-auto lg:mx-0 mt-4 bg-white rounded-lg shadow-lg cursor-pointer select-none relative"),
              (r.innerHTML = `<div\n                      class="bg-white rounded-lg shadow-lg cursor-pointer"\n                    >\n                      <div class="db-upper px-[80px] py-[50px] flex flex-col justify-center align-middle rounded-lg h-[70%] items-center text-center">\n                        <p\n                          class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 domainNames"\n                        >\n                          ${e.result[t].split(".")[0]
                }\n                        </p>\n                      </div>\n                      <div\n                        class="db-lower flex gap-4 border-t p-4 justify-between items-center h-auto"\n                      >\n                        <div class="dbl-l">\n                          <p class="text-gray-500">${e.result[
                  t
                ].toLowerCase()}</p>\n                        </div>\n                        <div class="dbl-r flex gap-2 items-center">\n                          <p class="text-gray-500">$ ${e.result[t].toLowerCase().includes(".com")
                  ? 9.58
                  : e.result[t].toLowerCase().includes(".net")
                    ? 11.18
                    : e.result[t].toLowerCase().includes(".org")
                      ? 8.98
                      : e.result[t].toLowerCase().includes(".io")
                        ? 39.98
                        : e.result[t].toLowerCase().includes(".me")
                          ? 8.98
                          : e.result[t].toLowerCase().includes(".co")
                            ? 9.48
                            : e.result[t].toLowerCase().includes(".info")
                              ? 3.98
                              : e.result[t].toLowerCase().includes(".pro")
                                ? 3.48
                                : e.result[t].toLowerCase().includes(".ai")
                                  ? 79.98
                                  : e.result[t].toLowerCase().includes(".xyz")
                                    ? 2.01
                                    : null
                }</p><span class='buyCTA'><a href="https://namecheap.pxf.io/c/261076/386170/5618" target='_blank'><p class="text-white px-2 py-1 rounded-md cursor-pointer" style="background-color: #00A878;">Register</p></a></span></div></div></div>                    \n                    <div class='idb-abs'>\n                      <div class='idb-inside flex gap-2'>\n                      <i class="fa-regular fa-heart idb-bookmark normalBookmarkColor"></i>\n                      <i class="fa-regular fa-copy idb-copy"></i>\n                      </div>\n                    </div>\n\n                    <div class="idb-left">\n                      <p>Copied.</p>\n                    </div>\n                    `),
              domainBoxParent.prepend(r),
              blankSuggestion.classList.add("hidden"),
              domainSuggestionEngine.scrollIntoView({ behavior: "smooth" });
          }
          let domainBoxes = document.querySelectorAll('.domain-box');
  
    domainBoxes.forEach(d => {
      d.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent click event from bubbling up to document
        let clickedElement = event.target;
        leftWrapper.classList.remove('hidden-el');
        // Update domain name based on clicked element
        let domainNameInsideModal = document.querySelector('.inside-modal-domain-name');
        let domainNameDomainPrice = document.querySelector('.d-pdf');
        let searchOnGoogle = document.querySelector('.searchOnGoogle');
        if (typeof clickedElement.value === 'string') {
          clickedElementValue = clickedElement.value.split('.')[0]
          domainNameInsideModal.innerHTML = clickedElementValue.charAt(0).toUpperCase() + clickedElementValue.slice(1);
          domainNameDomainPrice.innerHTML = clickedElementValue.charAt(0).toUpperCase() + clickedElementValue.slice(1);
        } else {
          clickedElementText = clickedElement.textContent.split('.')[0]
          domainNameInsideModal.innerHTML = clickedElementText.charAt(0).toUpperCase() + clickedElementText.slice(1);
          domainNameDomainPrice.innerHTML = clickedElementText.charAt(0).toUpperCase() + clickedElementText.slice(1);
        }
        searchOnGoogle.addEventListener('click', () => {
          clickedElementText = clickedElement.textContent.split('.')[0]
          window.open(`https://www.google.com/search?q=${clickedElementText.charAt(0).toUpperCase() + clickedElementText.slice(1)}`, "blank").focus();
        })
  
    // let i = document.querySelector(".loader-tlds");
    // i.style.display = "block";
      let s = { domain: domainNameInsideModal.textContent }
      fetch("/different-tld-check/", {
        method: "POST",
        body: JSON.stringify(s),
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      })
        .then((e) => e.json())
        .then((e) => {
          (ulElement.innerHTML = ""),
            (ulElement.style.visibility = "visible");
          for (let t = 0; t < e.result.domains.length; t++) {
            let o = document.createElement("li");
            (o.className = "flex justify-between w-[50%] tldDomainBox"),
              (o.innerHTML = `<span class="flex tldDomainBoxSpan"><i class="${e.result.domains[t].available
                  ? "fa-solid fa-check text-[#46ba6a] pr-2"
                  : "fa-solid fa-xmark pr-2"
                }"></i>\n<p class="tldDomainBoxPFont">${e.result.domains[t].domain
                }</p>\n</span><a href="https://namecheap.pxf.io/c/261076/386170/5618" target="_blank"><p class="text-blue-600 text-sm16 lg:hidden lg:group-hover:block font-semibold">\n                        Register\n                        </p></a>`),
                ulElement.append(o);
          }
        })
        .finally(() => {
          // i.style.display = "none";
        });
  
  
      let dm_price = { domain: clickedElement.textContent }
      fetch("/different-platform-prices/", {
        method: "POST",
        body: JSON.stringify(dm_price),
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      })
        .then((e) => e.json())
        .then((e) => {
          console.log(e.domain)
          for (let t = 0; t < e.domain.length; t++) {
            (ulElDiffPlatforms.innerHTML = ""),
            (ulElDiffPlatforms.style.visibility = "visible");
            for (dmp of e.domain[t]) {
              let o = document.createElement("li");
              (o.className = "flex justify-between w-[50%] tldDomainBox"),
              (o.innerHTML = `<span class="flex tldDomainBoxSpan">
              <i class="fa-solid fa-check text-[#46ba6a] pr-2"></i>
              <p class="tldDomainBoxPFont">$<span>${dmp[1]}</span></p>
              </span>
              <span>
              <p class="text-blue-600 lg:hidden lg:group-hover:block font-semibold">${dmp[0]}</p>
              </span>`),
              ulElDiffPlatforms.append(o);
            } 
          }
        })
        .finally(() => {
          // i.style.display = "none";
        });
    })
    });

      });
  });

  let filterText = document.querySelector(".filter-text");
  let nameFilter = document.querySelector(".name-filter");
  let upFilter = document.querySelector(".up-filter");
  let downFilter = document.querySelector(".down-filter");

  filterText.addEventListener("click", () => {
    // alert('clicked filter')
    nameFilter.classList.toggle("hidden");
    downFilter.classList.toggle("feature-hidden");
    upFilter.classList.toggle("feature-hidden");
  });

  dee.forEach(d => {
    d.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent click event from bubbling up to document
      let clickedElement = event.target;
      leftWrapper.classList.remove('hidden-el');
      // Update domain name based on clicked element
      let domainNameInsideModal = document.querySelector('.inside-modal-domain-name');
      let domainNameDomainPrice = document.querySelector('.d-pdf');
      let searchOnGoogle = document.querySelector('.searchOnGoogle');
      if (typeof clickedElement.value === 'string') {
        clickedElementValue = clickedElement.value.split('.')[0]
        domainNameInsideModal.innerHTML = clickedElementValue.charAt(0).toUpperCase() + clickedElementValue.slice(1);
        domainNameDomainPrice.innerHTML = clickedElementValue.charAt(0).toUpperCase() + clickedElementValue.slice(1);
      } else {
        clickedElementText = clickedElement.textContent.split('.')[0]
        domainNameInsideModal.innerHTML = clickedElementText.charAt(0).toUpperCase() + clickedElementText.slice(1);
        domainNameDomainPrice.innerHTML = clickedElementText.charAt(0).toUpperCase() + clickedElementText.slice(1);
      }
      searchOnGoogle.addEventListener('click', () => {
        clickedElementText = clickedElement.textContent.split('.')[0]
        window.open(`https://www.google.com/search?q=${clickedElementText.charAt(0).toUpperCase() + clickedElementText.slice(1)}`, "blank").focus();
      })

  // let i = document.querySelector(".loader-tlds");
  // i.style.display = "block";
    let s = { domain: domainNameInsideModal.textContent }
    fetch("/different-tld-check/", {
      method: "POST",
      body: JSON.stringify(s),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    })
      .then((e) => e.json())
      .then((e) => {
        (ulElement.innerHTML = ""),
          (ulElement.style.visibility = "visible");
        for (let t = 0; t < e.result.domains.length; t++) {
          let o = document.createElement("li");
          (o.className = "flex justify-between w-[50%] tldDomainBox"),
            (o.innerHTML = `<span class="flex tldDomainBoxSpan"><i class="${e.result.domains[t].available
                ? "fa-solid fa-check text-[#46ba6a] pr-2"
                : "fa-solid fa-xmark pr-2"
              }"></i>\n<p class="tldDomainBoxPFont">${e.result.domains[t].domain
              }</p>\n</span><a href="https://namecheap.pxf.io/c/261076/386170/5618" target="_blank"><p class="text-blue-600 text-sm16 lg:hidden lg:group-hover:block font-semibold">\n                        Register\n                        </p></a>`),
              ulElement.append(o);
        }
      })
      .finally(() => {
        // i.style.display = "none";
      });


    let dm_price = { domain: clickedElement.textContent }
    fetch("/different-platform-prices/", {
      method: "POST",
      body: JSON.stringify(dm_price),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    })
      .then((e) => e.json())
      .then((e) => {
        for (let t = 0; t < e.domain.length; t++) {
          (ulElDiffPlatforms.innerHTML = ""),
          (ulElDiffPlatforms.style.visibility = "visible");
          for (dmp of e.domain[t]) {
            let o = document.createElement("li");
            (o.className = "flex justify-between w-[50%] tldDomainBox"),
            (o.innerHTML = `<span class="flex tldDomainBoxSpan">
            <i class="fa-solid fa-check text-[#46ba6a] pr-2"></i>
            <p class="tldDomainBoxPFont">${dmp[1]}</p>
            </span>
            <span>
            <p class="text-blue-600 lg:hidden lg:group-hover:block font-semibold">${dmp[0]}</p>
            </span>`),
            ulElDiffPlatforms.append(o);
          } 
        }
      })
      .finally(() => {
        // i.style.display = "none";
      });
  })
    });

  let speak = document.querySelector('.speak-loud');
  speak.addEventListener("click", () => {
    let e = new SpeechSynthesisUtterance(document.querySelector('.inside-modal-domain-name').textContent);
    speechSynthesis.speak(e);
  });

  document.querySelector("#copy").addEventListener("click", (e) => {
    navigator.clipboard
      .writeText(document.querySelector('.inside-modal-domain-name').textContent)
      .then(() => {
      })
      .catch((e) => {
        console.error("Failed to copy text:", e);
      }),
      (document.querySelector('#copy-response').style.display =
        "block"),
      e.stopPropagation();
  })

  let closeButton = document.querySelector('.closeButton');
  closeButton.addEventListener('click', function (event) {
    let tarEl = event.target;
    if (leftWrapper.contains(tarEl)) {
      leftWrapper.classList.add('hidden-el');
    }
  })

  // Tradmark Checker

  let trForm = document.querySelector("#tr-form");
  let trAlert = document.querySelector('.tr-alert');
  let faSpinnerT = document.querySelector('.fa-spinner-t');
  let trademarkSearch = document.querySelector("#tr-search")
  let csrfTokenTr = document.querySelector("[name=csrfmiddlewaretoken]").value;
  trForm.addEventListener("submit", (e) => {
    e.preventDefault(),
      faSpinnerT.classList.remove("feature-hidden"),
      fetch("/trademark-checker/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": csrfTokenTr },
        body: JSON.stringify({ trademarkLookup: trademarkSearch.value }),
      })
        .then((e) => e.json())
        .then((e) => {
          if ("yes" == e.result[0].available)
            trAlert.classList.remove("hidden"),
              trAlert.classList.contains("tr-alert-error") &&
              trAlert.classList.remove("tr-alert-error"),
              trAlert.classList.add("tr-alert-success"),
              (trAlert.innerHTML = `Trademark is availble to register for the term '${e.result[0].keyword}'`);
          else {
            let t = document.querySelector(".tr-alert");
            t.classList.remove("hidden"),
              t.classList.contains("tr-alert-success") &&
              t.classList.remove("tr-alert-success"),
              t.classList.add("tr-alert-error"),
              (t.innerHTML = `Trademark is already registered for the term '${e.result[0].keyword}'`);
          }
          faSpinnerT.classList.add("feature-hidden");
        });
  });

  // Social checker

  let uForm = document.querySelector("#u-form");
  let usernameSearch = document.querySelector("#u-search");
  let social_list = document.querySelectorAll(".check-icon");
  let faSpinnerU = document.querySelector(".fa-spinner-u");

  uForm.addEventListener("submit", (e) => {
    e.preventDefault(),
      faSpinnerU.classList.remove("feature-hidden"),
      fetch("/social-checker/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": csrfToken },
        body: JSON.stringify({ username: usernameSearch.value }),
      })
        .then((e) => e.json())
        .then((e) => {
          let t = e.result;
          for (let e = 0; e < social_list.length; e++) {
            let r = social_list[e].querySelector("span").textContent.trim();
            t.includes(r)
              ? social_list[e].classList.add("green-signal")
              : social_list[e].classList.add("red-signal");
          }
          faSpinnerU.classList.add("feature-hidden");
        });
  });

  


  // Suggest Engine

  // document.querySelector("#s-form").addEventListener("submit", (e) => {
  //   e.preventDefault(); 
  //   let faSpinner = document.querySelector(".fa-spinner-g");
  //   faSpinner.classList.remove("feature-hidden");
  //   console.log("Request data:", JSON.stringify({
  //     data: t,
  //     first_number: document.querySelector("#number11").value,
  //     last_number: document.querySelector("#number22").value,
  //     radioExtension: r.value,
  // }));
  //   let t = document.querySelector("#prompt").value;
  //   const r = document
  //     .getElementById("radio-group")
  //     .querySelector('input[type="radio"]:checked');
  //   fetch("/suggestion-engine/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", "X-CSRFToken": csrfToken },
  //     body: JSON.stringify({
  //       data: t,
  //       first_number: document.querySelector("#number11").value,
  //       last_number: document.querySelector("#number22").value,
  //       radioExtension: r.value,
  //     }),
  //   })
  //     .then((e) => e.json())
  //     .then((e) => {
  //       faSpinner.classList.add("feature-hidden");
  //       let t = document.querySelectorAll(".domain-box");
  //       if (t) for (let e = 0; e < t.length; e++) t[e].remove();
  //       let o = document.createElement("div");
  //       if (
  //         ((o.className =
  //           "domain-box lg:w-[30%] w-[90%] bg-white mx-auto lg:mx-0 mt-4 bg-white rounded-lg shadow-lg cursor-pointer select-none relative"),
  //           0 === e.result.length)
  //       ) {
  //         let e = document.createElement("p");
  //         document
  //           .querySelector(".blank-domain-suggestion")
  //           .classList.add("feature-hidden"),
  //           e.classList.add("text-center-assist"),
  //           (e.innerText = `No .${r.value} domains found! Try again.`),
  //           o.appendChild(e),
  //           (document.querySelector(".domain-box").style.background = "#cd1515"),
  //           (document.querySelector(".domain-box").style.color = "white"),
  //           (document.querySelector(".domain-box").style.padding = "3rem"),
  //           domainBoxParent.prepend(o),
  //           (domainBoxParent.querySelector(".domain-box").style.background =
  //             "#cd1515"),
  //           (domainBoxParent.querySelector(".domain-box").style.color = "white"),
  //           (domainBoxParent.querySelector(".domain-box").style.padding = "3rem"),
  //           domainBoxParent.scrollIntoView({ behavior: "smooth" });
  //       } else
  //         for (let t = 0; t < e.result.length; t++) {
  //           let r = document.createElement("div");
  //           (r.className =
  //             "domain-box lg:w-[30%] w-[90%] bg-white mx-auto lg:mx-0 mt-4 bg-white rounded-lg shadow-lg cursor-pointer select-none relative"),
  //             (r.innerHTML = `<div\n                      class="bg-white rounded-lg shadow-lg cursor-pointer"\n                    >\n                      <div class="db-upper px-[80px] py-[50px] flex flex-col justify-center align-middle rounded-lg h-[70%] items-center text-center">\n                        <p\n                          class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 domainNames"\n                        >\n                          ${e.result[t].split(".")[0]
  //               }\n                        </p>\n                      </div>\n                      <div\n                        class="db-lower flex gap-4 border-t p-4 justify-between items-center h-auto"\n                      >\n                        <div class="dbl-l">\n                          <p class="text-gray-500">${e.result[
  //                 t
  //               ].toLowerCase()}</p>\n                        </div>\n                        <div class="dbl-r flex gap-2 items-center">\n                          <p class="text-gray-500">$ ${e.result[t].toLowerCase().includes(".com")
  //                 ? 9.58
  //                 : e.result[t].toLowerCase().includes(".net")
  //                   ? 11.18
  //                   : e.result[t].toLowerCase().includes(".org")
  //                     ? 8.98
  //                     : e.result[t].toLowerCase().includes(".io")
  //                       ? 39.98
  //                       : e.result[t].toLowerCase().includes(".me")
  //                         ? 8.98
  //                         : e.result[t].toLowerCase().includes(".co")
  //                           ? 9.48
  //                           : e.result[t].toLowerCase().includes(".info")
  //                             ? 3.98
  //                             : e.result[t].toLowerCase().includes(".pro")
  //                               ? 3.48
  //                               : e.result[t].toLowerCase().includes(".ai")
  //                                 ? 79.98
  //                                 : e.result[t].toLowerCase().includes(".xyz")
  //                                   ? 2.01
  //                                   : null
  //               }</p><span class='buyCTA'><a href="https://namecheap.pxf.io/c/261076/386170/5618" target='_blank'><p class="text-white px-2 py-1 rounded-md cursor-pointer" style="background-color: #00A878;">Register</p></a></span></div></div></div>                    \n                    <div class='idb-abs'>\n                      <div class='idb-inside flex gap-2'>\n                      <i class="fa-regular fa-heart idb-bookmark normalBookmarkColor"></i>\n                      <i class="fa-regular fa-copy idb-copy"></i>\n                      </div>\n                    </div>\n\n                    <div class="idb-left">\n                      <p>Copied.</p>\n                    </div>\n                    `),
  //             domainBoxParent.prepend(r),
  //             blankSuggestion.classList.add("hidden"),
  //             domainSuggestionEngine.scrollIntoView({ behavior: "smooth" });
  //         }
  //     });
  // });


let submitButton = document.getElementById('submitButton');
let smallCtrDiv = document.querySelector('.small-ctr');
let remainingSearchesSpan = document.getElementById('remainingSearches');
let keyword = document.querySelector('#prompt')
let now = Date.now();

// Retrieve last submission time or set it to current time if not available
let lastSubmissionTime = parseInt(localStorage.getItem('lastSubmissionTime') || now);

// Calculate time difference in milliseconds
let timeDiff = now - lastSubmissionTime;

// Check if 24 hours have passed
if (timeDiff >= 24 * 60 * 60 * 1000) {
  remainingSearches = 3;
  localStorage.setItem('remainingSearches', remainingSearches);
  localStorage.setItem('lastSubmissionTime', now);
} else {
  // Get remaining searches from storage
  remainingSearches = parseInt(localStorage.getItem('remainingSearches') || '3');
}

// Update UI
remainingSearchesSpan.textContent = remainingSearches;
let form = document.querySelector('#homeForm')
let form_input = document.querySelector('#prompt');
form.addEventListener('submit', function (event) {
  // event.preventDefault();

  if (remainingSearches <= 0) {
    alert('No more free searches available today. Please Sign-Up for unlimited searches.');
    return;
  }

  remainingSearches--;
  localStorage.setItem('remainingSearches', remainingSearches);
  remainingSearchesSpan.textContent = remainingSearches;

  if (remainingSearches === 0) {
    form_input.disabled = true;
    submitButton.disabled = true;
  }
});
});
