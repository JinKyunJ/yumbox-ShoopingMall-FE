document.addEventListener("DOMContentLoaded", function () {
  // 주문상품 서버에서 불러오기
  const fetchOrderProducts = async () => {
    try {
      const response = await fetch("", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        const orderProducs = data.order_products;
        const orderList = document.querySelector(".order-list");
        let html = "";
        orderProducs.forEach(({ price, sale, image, title }) => {
          html += `
            <li>
              <div class="img-box">
                <img src="${image}" alt="${title}" />
              </div>
              <div class="info-box">
                <p class="product-title">${title}</p>
                <div>
                  <b class="price">${price * ((100 - sale) / 100)}원</b
                  ><span class="fixed-price">${price}원</span> | n개
                </div>
              </div>
            </li>
          `;
        });

        orderList.innerHtml = html;
      }
    } catch (error) {
      orderList.innerText = "오류로 인해 상품을 불러오지 못했습니다.";
      console.log(error);
    }
  };

  // 주문자 정보 서버에서 불러오기
  const fetchUserInfo = async () => {
    try {
      const response = fetch("", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const { email, name, address } = data.user;
      const userName = document.getElementById("user-name");
      const userEmail = document.getElementById("user-email");
      const userAddress = document.getElementById("user-address");

      // 적립금은 어떻게 가져오는지 물어보기...
      const userMileage = document.getElementById("user-mileage");

      userName.innerText = name;
      userEmail.innerText = email;
      userAddress.innerText = address;
      userMileage.innerText = "";
    } catch (error) {
      console.log(error);
    }
  };

  // 적립금 사용했을 경우 기존 적립금 - 사용한 적립금 값 구해서 서버에 전달해야 하나??
  const useAllMileageBtn = document.getElementById("use-all-mileage");
  const mileageInput = document.getElementById("use-mileage-input");
  let mileage = document.getElementsByName("mileage")[0].value;
  const userMileage = document.getElementById("user-mileage");

  // 적립금 모두사용 버튼 눌렀을 때
  useAllMileageBtn.addEventListener("click", () => {
    mileageInput.value = mileage;
    userMileage.innerText = 0;
  });

  // 사용 적립금 입력 시 사용가능 적립금 반영
  mileageInput.addEventListener("input", () => {
    if(!mileageInput.value) {
      mileageInput.value = 0;
    }
    
    if (mileageInput.value < 0) {
      alert("정수를 입력해주세요.");
      mileageInput.value = 0;
      return false;
    }


    mileageInput.value = mileageInput.value.replace(/^0+/, '');

    let result = parseInt(mileage - mileageInput.value);

    if (result < 0) {
      result = mileage;
      mileageInput.value = result;
    }
    userMileage.innerText = result;
  });

  // 화살표 있는 title-box 클릭 시 내용이 접히도록 작업
  const titleEl = document.querySelectorAll(".toggle-title");
  titleEl.forEach((el) => {
    el.addEventListener("click", () => {
      if (el.className.includes("active")) {
        el.classList.remove("active");
      } else {
        el.classList.add("active");
      }
    });
  });

  //fetchOrderProducts(); // 주문상품 불러오기 실행
  //fetchUserInfo(); // 주문자 정보 불러오기 실행
});