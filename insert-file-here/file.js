//insert file here...
export let fileToEdit = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- <link href="style.css" rel="stylesheet" /> -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <link href="style.css" rel="stylesheet" />
  </head>
  <body>
    <!-- Nav Bar -->
    <nav class="navbar navbar-expand-lg navbar-light" id="nav-bar">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Lucia Montih</a>

        <button
          class="navbar-toggler float-right"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse float-right" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" id="work-nav" aria-current="page" href="#"
                >Work</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" id="about-nav" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="contact-nav" href="#">Contact</a>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>

    <!-- Image Grid -->
    <div id="work-section" class="container-fluid image--grid">
      <div class="row g-4 grid-row-1 m-3">
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="size-1" src="./src/img/Untitled_Artwork67copy2.jpg" />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="size-1" src="./src/img/Untitled_Artwork672.jpg" />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="size-1" src="./src/img/Untitled_Artwork65.jpg" />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="size-1" src="./src/img/Untitled_Artwork70.jpg" />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="size-1" src="./src/img/Untitled_Artwork68.jpg" />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="size-7" src="./src/img/Untitled_Artwork601copy.jpg" />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="size-5" src="./src/img/Untitled_Artwork67.jpg" />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="size-1" src="./src/img/Untitled_Artwork_1_copy.jpg" />
        </div>
        <!-- Lazy Loading starts here -->
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy11.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy8.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-5"
            data-src="./src/img/Untitled_Artwork60copy7.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60-2.jpg"
          />
          <!-- <img class="lazy size-7" data-src="./src/img/Untitled_Artwork601copy.jpg" /> -->
        </div>

        <div
          class="black-border col-xl-6 col-lg-8 col-md-10 col-sm-12 img-gal-component"
        >
          <img
            alt="3 women 1 dog 1 surf board"
            id="women-3-dog-1-surf-board"
            class="lazy size-2"
            data-src="./src/img/Untitled_Artwork60copy4.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="lazy size-1" data-src="./src/img/Untitled_Artwork.gif" />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Christmas_Couple_1.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy5.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy18.jpg"
          />
        </div>
        <div
          class="black-border col-xl-6 col-lg-8 col-md-10 col-sm-12 img-gal-component"
        >
          <img
            alt="6 women 1 sitting"
            id="women-6-posing"
            class="lazy size-2"
            data-src="./src/img/Untitled_Artwork60copy6.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="lazy size-1" data-src="./src/img/Sketch.jpg" />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-7"
            data-src="./src/img/Untitled_Artwork61.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-5"
            data-src="./src/img/Untitled_Artwork60copy12.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy15.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy14.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy10.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy9.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="lazy size-1" data-src="./src/img/B.jpg" />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy13.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy21.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="lazy size-1" data-src="./src/img/Final.jpg" />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy17.jpg"
          />
        </div>

        <div
          class="black-border col-xl-6 col-lg-8 col-md-10 col-sm-12 img-gal-component"
        >
          <img
            alt="7 women posing"
            id="women-7-posing"
            class="lazy size-2"
            data-src="./src/img/Untitled_Artwork60copy23.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy27.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="lazy size-1" data-src="./src/img/Listo.jpg" />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy20.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="lazy size-1" data-src="./src/img/moving_1.jpg" />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy22.jpg"
          />
        </div>

        <div
          id="floreros-5-lg"
          class="col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <!-- Image swap 1 -->
          <img
            class="lazy size-1"
            data-src="./src/img/Sin_Simbras_-_Listo.jpg"
          />
        </div>

        <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 img-gal-component">
          <!-- Image swap 1 -->
          <img
            alt="Happy Birthday"
            id="happy-birthday"
            class="lazy size-7"
            data-src="./src/img/Untitled_Artwork60copy19.jpg"
          />
        </div>

        <div
          id="floreros-5"
          class="col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <!-- Image swap 1 -->
          <img
            class="lazy size-1"
            data-src="./src/img/Sin_Simbras_-_Listo.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy232.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy102.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork610.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy16.jpg"
          />
        </div>

        <div
          id="doggy"
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <!-- Dogy -->
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork609copy2.jpg"
          />
        </div>

        <div
          class="black-border col-xl-6 col-lg-8 col-md-10 col-sm-12 img-gal-component"
        >
          <img
            alt="Happy New Year"
            id="happy-new-year"
            class="lazy size-8"
            data-src="./src/img/Happy_New_Year_2020.jpg"
          />
        </div>

        <div
          id="ghost-doggy"
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <!-- Ghost Doggy -->
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork609copy2.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy24.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork063.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy25.jpg"
          />
        </div>

        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork692.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="lazy size-1" data-src="./src/img/Gif_Instagram.gif" />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork765.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork66.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork668.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork567.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork064.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork169.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy29.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork770.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork71.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy826.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork72.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork61copy.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Base_Flower_Bouquet2.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-7"
            data-src="./src/img/Untitled_Artwork64.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img class="lazy size-7" data-src="./src/img/Version_2_Negro2.jpg" />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Untitled_Artwork60copy28.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Pattern_Definitivo.jpg"
          />
        </div>
        <div
          class="black-border col-xl-3 col-lg-4 col-md-6 col-sm-12 img-gal-component"
        >
          <img
            class="lazy size-1"
            data-src="./src/img/Floral_Pattern_6000x6000.jpg"
          />
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div id="about-section" class="container-fluid">
      <div class="row g-5">
        <div class="col-md-12 col-lg-6">
          <img
            class="img-fluid"
            alt="self portrait smiling"
            src="src/img/Lucia.jpg"
          />
        </div>
        <div class="col-md-12 col-lg-6">
          <p>
            Lucia Montih is a Chilean illustrator based in Seattle, WA. She
            studied Interior Design in her home country but realized
            illustration and graphic design was her big passion. She is
            currently specializing in lettering and calligraphy. She loves
            drawing people in different scenarios, travel portraits, patterns
            and anything else you can dream up. In addition to illustration and
            design, she enjoys street photography and portraits. In her spare
            time, she likes to visit small towns, hike, practice yoga, and go to
            local coffee shops and be inspired by her surroundings.
          </p>
        </div>
      </div>
      <div class="row m-4 button-contact">
        <div class="col-6 d-grid mx-auto">
          <button
            type="button"
            class="btn btn-dark btn-lg"
            onClick="changeDisplayContact()"
          >
            Contact
          </button>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div id="contact-section" class="container">
      <div class="justify-content-center row g-4">
        <div class="mb-2 col-auto">
          <!-- <form action="https://luciamontih.com/" method="POST" id="contact-form" enctype="multipart/form-data"> -->
          <form id="contact-form">
            <div class="row">
              <div class="mb-2 col-auto">
                <label
                  style="padding-right: 3.2rem"
                  for="first-name-input"
                  class="form-label"
                  >Name</label
                >
                <input type="text" id="first-name-input" name="fname" />
              </div>
              <div class="mb-2 col-auto">
                <label
                  style="padding-right: 1rem"
                  for="last-name-input"
                  class="form-label"
                  >Last Name</label
                >
                <input type="text" id="last-name-input" name="lname" />
              </div>
            </div>
            <div class="row">
              <div class="mb-2 col-auto">
                <label
                  style="padding-right: 3.5rem"
                  for="email-input"
                  class="form-label"
                  >email</label
                >
                <input type="email" id="email-input" name="email" />
              </div>
              <div class="mb-2 col-auto">
                <label
                  style="padding-right: 3rem"
                  for="phone-input"
                  class="form-label"
                  >Phone
                </label>
                <input type="tel" id="phone-input" name="phone" />
              </div>
            </div>

            <div class="row">
              <div class="col-2">
                <label for="message-input" class="form-label">Message </label>
              </div>
              <div class="col-10">
                <textarea
                  id="form-message"
                  form="contact-form"
                  name="message"
                ></textarea>
              </div>
            </div>

            <div class="row justify-content-center p-4">
              <div class="col-auto">
                <button
                  type="submit"
                  value="formData"
                  onClick="processSendFormData()"
                  class="btn form-submit-button btn-dark"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

        <div class="col-auto lumontihgmailcom">
          <div>
            <h6>
              <a href="mailto:luciamontih@gmail.com">luciamontih@gmail.com</a>
            </h6>
          </div>
          <div class="col-auto insta-logo-link">
            <a
              target="_blank"
              class=""
              href="https://www.instagram.com/luciamontih/"
            >
              <img class="insta-logo" src="src/img/insta.png" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <br />
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>
    <script src="index.js"></script>
  </body>
</html>
`;
