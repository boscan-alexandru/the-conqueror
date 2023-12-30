// imports
import { Cart } from "./cart.js";

// components
let challenges_component = document.getElementById("challenges");
let cart_total_items_component = document.getElementById("cart_total_items");
let cart_items_component = document.getElementById("cart_items");
let cart_summary_component = document.getElementById("cart_summary");
let add_challenge_buttons = document.querySelectorAll(".add_challenge_btn");

// local variables
let today = new Date();
const cart = new Cart();
const challenges = [
  {
    id: 0,
    name: "Angkor Wat",
    type: "single", // multiple
    slug: "/challenge.html",
    images: ["/assets/images/challenges/aw/AW.png"],
    bg_image: "/assets/images/challenges/aw/bg_aw.png",
    distance: {
      mi: 26,
      km: 42,
    },
    has_street_view: true,
    has_post_cards: true,
    post_cards: [
      {
        id: 0,
      },
    ],
    price: 5550, // in cents
    created_at: new Date(today.valueOf() - 1000 * 60 * 60 * 24 * 20),
  },
  {
    id: 1,
    name: "Berlin Wall",
    type: "single", // multiple
    slug: "/challenge.html",
    images: ["/assets/images/challenges/bw/BW.png"],
    bg_image: "/assets/images/challenges/bw/bg_bw.png",
    distance: {
      mi: 55,
      km: 106,
    },
    has_street_view: true,
    has_post_cards: true,
    post_cards: [
      {
        id: 0,
      },
      {
        id: 1,
      },
      {
        id: 3,
      },
    ],
    price: 3400, // in cents
    created_at: new Date(today.valueOf() - 1000 * 60 * 60 * 24 * 0),
  },
  {
    id: 2,
    name: "Inca Trail",
    type: "single", // multiple
    slug: "/challenge.html",
    images: ["/assets/images/challenges/it/IT.png"],
    bg_image: "/assets/images/challenges/it/bg_it.png",
    distance: {
      mi: 55,
      km: 106,
    },
    has_street_view: false,
    has_post_cards: true,
    post_cards: [
      {
        id: 0,
      },
      {
        id: 1,
      },
      {
        id: 3,
      },
    ],
    price: 2430, // in cents
    created_at: new Date(today.valueOf() - 1000 * 60 * 60 * 24 * 30),
  },
  {
    id: 3,
    name: "Mount Kilimanjaro",
    type: "single", // multiple
    slug: "/challenge.html",
    images: ["/assets/images/challenges/kj/KJ.png"],
    bg_image: "/assets/images/challenges/kj/bg_kj.png",
    distance: {
      mi: 60,
      km: 97,
    },
    has_street_view: true,
    has_post_cards: true,
    post_cards: [
      {
        id: 0,
      },
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
    ],
    price: 6480, // in cents
    created_at: new Date(today.valueOf() - 1000 * 60 * 60 * 24 * 0),
  },
];

// methods
const setCartItemsCount = () => {
  cart.calculateTotalCost();
  cart_total_items_component.innerHTML = cart.getItemsCount();
};
const prepare_ordered_challenge_card = (item) => {
  // some computed variables for code readability
  let has_street_view_text = item.has_street_view
    ? "Has StreetView"
    : "No StreetView";
  let virtual_post_cards_text =
    item.has_post_cards && item.post_cards.length > 0
      ? `${item.post_cards.length} Virtual Postcards`
      : "No Postcards";
  return `<div id="cart_item_${
    item.id
  }" class="cart_order_item flex justify-between gap-2">
               <div class="flex flex_mobile gap-2">
                  <img class="cart_order_item_preview h-fit" src="${
                    item.images[0]
                  }" />
                  <div class="grid h-fit w-fit">
                     <h2 class="cart_order_item_title">${item.name}</h2>
                     <p class="price_tag desktop-hidden">${
                       item.price.toFixed(2) / 100
                     } €</p>
                     <p class="challenge_distance">${item.distance.mi} mi / ${
    item.distance.km
  } km</p>
                     <p class="challenge_postcards_amount">${virtual_post_cards_text}</p>
                     <p class="challenge_has_street_view">${has_street_view_text}</p>
                  </div>
               </div>
               <div class="flex flex-collumn flex_mobile justify-end gap-2 gap-2-mobile h-fit items-center">
                  <div class="flex flex_mobile justify-end gap-2 gap-2-mobile h-fit items-center">
                     <p class="price_tag mobile-hidden">${
                       item.price.toFixed(2) / 100
                     } €</p>
                     <div class="flex flex_mobile items-center gap-2 gap-2-mobile">
                        <button id="${`remove_challenge_button_${item.id}`}" class="btn remove-btn-icon p-5 items-center">
                           ➖
                        </button>
                        <p id="cart_item_amount_${item.id}">${item.amount}</p>
                        <button id="${`add_challenge_button_${item.id}`}" class="btn remove-btn-icon p-5 items-center">
                           ✖️
                        </button>
                     </div>
                     <button id="${`delete_challenge_button_${item.id}`}" class="btn remove-btn-icon p-5 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17.5" height="18" viewBox="0 0 17.5 18">
                           <path id="trash" d="M140.75,242a.75.75,0,0,1-.75.75H124a.75.75,0,0,1,0-1.5h4.214a4.529,4.529,0,0,0,.242-.618l.2-.607A1.5,1.5,0,0,1,130.081,239h3.838a1.5,1.5,0,0,1,1.423,1.025l.2.607a4.529,4.529,0,0,0,.242.618H140A.75.75,0,0,1,140.75,242Zm-2.19,1.75a.3.3,0,0,1,.3.32l-.669,10.13a2.718,2.718,0,0,1-3,2.8h-6.38a2.718,2.718,0,0,1-3-2.8l-.669-10.13a.3.3,0,0,1,.3-.32ZM130.75,247a.75.75,0,0,0-1.5,0v5a.75.75,0,0,0,1.5,0Zm4,0a.75.75,0,0,0-1.5,0v5a.75.75,0,0,0,1.5,0Z" transform="translate(-123.25 -239)" fill="red"/>
                        </svg>
                     </button>
                  </div>
                  <p class="flex flex_mobile w-full gap-1 justify-end text-right"><strong>Total: </strong> <span id="cart_item_total_price_${
                    item.id
                  }">${
    cart.getItemTotalPrice(item).toFixed(2) / 100
  }</span> €</p>
               </div>
            </div>`;
};
const prepare_challenge_card = (challenge) => {
  // some computed variables for code readability
  let has_street_view_text = challenge.has_street_view
    ? "Has StreetView"
    : "No StreetView";
  let virtual_post_cards_text =
    challenge.has_post_cards && challenge.post_cards.length > 0
      ? `${challenge.post_cards.length} Virtual Postcards`
      : "No Postcards";
  // if created_at is smaller than 30 days
  let is_new =
    new Date(today.valueOf() - 1000 * 60 * 60 * 24 * 20) >
    new Date(challenge.created_at)
      ? false
      : true;

  return `
               <div class="card grid" style="background-image: linear-gradient(180deg,rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0) 18%,rgb(255, 255, 255) 28%), url('${
                 challenge.bg_image
               }');">
                  <div class="challenge_image_container flex w-full justify-center">
                     <img class="challenge_image" src="${
                       challenge.images
                     }" alt=""/>
                  </div>
                  ${is_new ? '<div class="badge">NEW</div>' : ""}
                  <div class="section-content grid gap-1 text-center">
                     <a href="${challenge.slug}"><h2 class="challenge_title">${
    challenge.name
  }</h2></a>
                     <p class="challenge_distance">${
                       challenge.distance.mi
                     } mi / ${challenge.distance.km} km</p>
                     <p class="challenge_postcards_amount">${virtual_post_cards_text}</p>
                     <p class="challenge_has_street_view">${has_street_view_text}</p>
                     <button id="${`add_challenge_button_${challenge.id}`}" class="btn main-btn add_challenge_btn">Add challenge</button>
                  </div>
               </div>
            `;
};
const attach_challenge_cards = () => {
  challenges.forEach((challenge) => {
    challenges_component.insertAdjacentHTML(
      "beforeend",
      prepare_challenge_card(challenge)
    );
    let add_challenge_button = document.getElementById(
      `add_challenge_button_${challenge.id}`
    );
    add_challenge_button.addEventListener("click", (event) => {
      console.log("added event", challenge);
      cart.addToCart(challenge);
      setCartItemsCount();
    });
  });
};
const add_ordered_challenge = (item, event) => {
  console.log("item_id", item.id);

  var amount_component = document.getElementById(`cart_item_amount_${item.id}`);
  var cart_item_total_price_component = document.getElementById(
    `cart_item_total_price_${item.id}`
  );

  console.log("updating amount", amount_component);
  cart.addToCart(item);
  amount_component.innerHTML = cart.getItemAmount(item);
  cart_item_total_price_component.innerHTML =
    cart.getItemTotalPrice(item).toFixed(2) / 100;
  console.log("finished");

  setCartItemsCount();
  attach_cart_summary();
};
const remove_ordered_challenge = (item, event) => {
  console.log("item_id", item.id);

  var amount_component = document.getElementById(`cart_item_amount_${item.id}`);
  var cart_item_component = document.getElementById(`cart_item_${item.id}`);
  var cart_item_total_price_component = document.getElementById(
    `cart_item_total_price_${item.id}`
  );

  //   if (cart.getItemAmount(item) >= 2) {
  //     console.log("updating amount");
  if (cart.getItemAmount(item) <= 0) {
    console.log("removed element");
    cart_item_component.remove();
  } else cart.removeFromCart(item);
  amount_component.innerHTML = cart.getItemAmount(item);
  cart_item_total_price_component.innerHTML =
    cart.getItemTotalPrice(item).toFixed(2) / 100;
  setCartItemsCount();
  attach_cart_summary();
};
const delete_ordered_challenge = (item, event) => {
  console.log("item_id", item.id);
  var cart_item_component = document.getElementById(`cart_item_${item.id}`);

  cart.deleteFromCart(item);
  console.log("removed element");
  cart_item_component.remove();

  setCartItemsCount();
  attach_cart_summary();
};
// cart page
const attach_ordered_challenges = () => {
  cart.items.forEach((item) => {
    cart_items_component.insertAdjacentHTML(
      "beforeend",
      prepare_ordered_challenge_card(item)
    );
    // add event
    let add_challenge_button = document.getElementById(
      `add_challenge_button_${item.id}`
    );
    add_challenge_button.addEventListener("click", (event) => {
      add_ordered_challenge(item, event);
    });
    // remove event
    let remove_from_cart_button = document.getElementById(
      `remove_challenge_button_${item.id}`
    );
    remove_from_cart_button.addEventListener("click", (event) => {
      remove_ordered_challenge(item, event);
    });
    // delete event
    let delete_from_cart_button = document.getElementById(
      `delete_challenge_button_${item.id}`
    );
    delete_from_cart_button.addEventListener("click", (event) => {
      delete_ordered_challenge(item, event);
    });
  });
};
const attach_cart_summary = () => {
  cart_summary_component.innerHTML = `<div class="flex w-full justify-end">
                                          <div class="grid h-fit">
                                             <h2 class="cart_order_item_title">Total ordered: ${
                                               cart.total_cost.toFixed(2) / 100
                                             } €</h2>
                                          </div>
                                       </div>`;
};
const init = () => {
  if (
    window.window.location.href == "http://127.0.0.1:5500/index.html" ||
    window.window.location.href == "http://127.0.0.1:5500/"
  ) {
    attach_challenge_cards();
  }
  if (window.window.location.href == "http://127.0.0.1:5500/cart.html") {
    attach_ordered_challenges();
    attach_cart_summary();
  }

  // add the count to cart button
  setCartItemsCount();
  console.log("✅initialized");
};

// initializing the app
init();
