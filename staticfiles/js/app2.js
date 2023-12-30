document.addEventListener("DOMContentLoaded", function () {
  let dee = document.querySelectorAll('.npc-wrapper li');
  let leftWrapper = document.querySelector('.left-wrapper');
  let csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;
  let ulElement = document.querySelector(".ulElement");
  let ulElDiffPlatforms = document.querySelector(".ulElDiffPlatforms");
  
  dee.forEach(d => {
    d.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent click event from bubbling up to document
      let clickedElement = event.target;
      leftWrapper.classList.remove('hidden-el');
      // Update domain name based on clicked element
      let domainNameInsideModal = document.querySelector('.inside-modal-domain-name');
      let domainNameDomainPrice = document.querySelector('.d-pdf');
      let searchOnGoogle = document.querySelector('.searchOnGoogle');
      if (typeof clickedElement.parentElement.querySelector('.domainVar').value === 'string') {
        clickedElementValue = clickedElement.parentElement.querySelector('.domainVar').value.split('.')[0]
        domainNameInsideModal.innerHTML = clickedElementValue.charAt(0).toUpperCase() + clickedElementValue.slice(1);
        domainNameDomainPrice.innerHTML = clickedElementValue.charAt(0).toUpperCase() + clickedElementValue.slice(1);
      } else {
        clickedElementText = clickedElement.parentElement.querySelector('.domainVar').textContent.split('.')[0]
        domainNameInsideModal.innerHTML = clickedElementText.charAt(0).toUpperCase() + clickedElementText.slice(1);
        domainNameDomainPrice.innerHTML = clickedElementText.charAt(0).toUpperCase() + clickedElementText.slice(1);
      }
      searchOnGoogle.addEventListener('click', () => {
        clickedElementText = clickedElement.parentElement.querySelector('.domainVar').textContent.split('.')[0]
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


    let dm_price = { domain: clickedElement.parentElement.querySelector('.domainVar').textContent }
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
        console.log(e)
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
});
