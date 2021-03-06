/* eslint-disable no-undef */

Vue.use(VueStrap);

function scrollToUrlAnchorHeading() {
  if (window.location.hash) {
    jQuery(window.location.hash)[0].scrollIntoView();
  }
}

function setupSiteNav() {
  // Add event listener for site-nav-btn to toggle itself and site navigation elements.
  const siteNavBtn = document.getElementById('site-nav-btn');
  if (siteNavBtn) {
    siteNavBtn.addEventListener('click', function () {
      this.classList.toggle('shift');
      document.getElementById('site-nav').classList.toggle('open');
      document.getElementById('site-nav-btn-wrap').classList.toggle('open');
    });
  }
  // Creates event listener for all dropdown-btns in page.
  Array.prototype.forEach.call(
    document.getElementsByClassName('dropdown-btn'),
    dropdownBtn => dropdownBtn.addEventListener('click', function () {
      this.classList.toggle('dropdown-btn-open');
      const dropdownContent = this.nextElementSibling;
      const dropdownIcon = this.lastElementChild;
      dropdownContent.classList.toggle('dropdown-container-open');
      dropdownIcon.classList.toggle('rotate-icon');
    }),
  );
}

function setup() {
  // eslint-disable-next-line no-unused-vars
  const vm = new Vue({
    el: '#app',
    mounted() {
      scrollToUrlAnchorHeading();
    },
  });
  setupSiteNav();
}

function setupWithSearch(siteData) {
  const { searchbar } = VueStrap.components;
  // eslint-disable-next-line no-unused-vars
  const vm = new Vue({
    el: '#app',
    components: {
      searchbar,
    },
    data() {
      return {
        searchData: siteData.pages,
      };
    },
    methods: {
      searchCallback(match) {
        const page = `${baseUrl}/${match.src.replace('.md', '.html')}`;
        const anchor = match.heading ? `#${match.heading.id}` : '';
        window.location = `${page}${anchor}`;
      },
    },
    mounted() {
      scrollToUrlAnchorHeading();
    },
  });
  setupSiteNav();
}

jQuery.getJSON(`${baseUrl}/siteData.json`)
  .then(siteData => setupWithSearch(siteData))
  .catch(() => setup());
