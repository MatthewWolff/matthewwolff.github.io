// jumps around CLEANLY
function jump(to) {
  $('html, body').animate({
    scrollTop: ($(to).first().offset().top)
  }, 500);
}

// check if they're on mobile or not
window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};
// adjust bougie site content if it would overflow on mobile? 
if(window.mobilecheck()) {
  var titleEls = document.querySelectorAll(".terminal-title");
  titleEls.forEach(function(el) {
    var text = el.textContent.replace('zsh - ssh -i ~/.ssh/id_rsa', 'ssh -i $KEY');
    el.innerHTML = '<i class="fa fa-terminal terminal-icon"></i>' + text.trim() + '<span class="connection-dot"></span>';
  });
  var prompts = document.getElementsByClassName("prompt");
  for (var i = 0; i < prompts.length; i++) {
      prompts[i].innerHTML = prompts[i].innerHTML.replace("(git master)", "").replace("(ssh)","");
  }
}

// === PROJECTS SECTION ANIMATION ===
(function() {
  var projectsSection = document.getElementById('projects');
  if (!projectsSection) return;

  var hasPlayed = false;
  var loadingLines = projectsSection.querySelectorAll('.loading-line');
  var grid = projectsSection.querySelector('.projects-grid');
  var cards = projectsSection.querySelectorAll('.project-card');

  cards.forEach(function(card) {
    var stat = card.getAttribute('data-stat');
    var statEl = card.querySelector('.card-stat');
    if (stat && statEl) {
      statEl.textContent = stat;
    }
  });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !hasPlayed) {
        hasPlayed = true;
        playLoadingAnimation();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(projectsSection);

  function playLoadingAnimation() {
    // Show first two lines with stagger
    var line1 = loadingLines[0];
    var line2 = loadingLines[1];
    var line3 = projectsSection.querySelector('.loading-line-rendering');

    setTimeout(function() { line1.classList.add('visible'); }, 0);
    setTimeout(function() { line2.classList.add('visible'); }, 200);

    // Animate progress bar by rewriting each frame
    setTimeout(function() {
      var line = projectsSection.querySelector('.progress-line');
      if (!line) return;
      var total = 20;
      var i = 0;
      var interval = setInterval(function() {
        i++;
        var bar = '='.repeat(i) + ' '.repeat(total - i);
        line.textContent = '[' + bar + ']' + (i >= total ? ' done' : '');
        if (i >= total) clearInterval(interval);
      }, 40);
    }, 300);

    // Show "Rendering..." after done
    setTimeout(function() {
      if (line3) line3.classList.add('visible');
    }, 1300);

    // Show cards
    setTimeout(function() {
      grid.classList.add('visible');
    }, 1600);
  }
})();

// === CONTACT SECTION ENTRANCE ===
(function() {
  var contactEl = document.querySelector('.contact-animate');
  if (!contactEl) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        contactEl.classList.add('visible');
        observer.unobserve(contactEl);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(contactEl);
})();

// === GA4 EVENT TRACKING ===
(function() {
  if (typeof gtag !== 'function') return;

  // Track project card clicks
  document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      // Don't double-track if GitHub icon was clicked
      if (e.target.closest('.card-github')) return;
      var title = card.querySelector('.card-title');
      gtag('event', 'project_click', {
        project_name: title ? title.textContent : '',
        link_url: card.href || '',
        click_source: 'card'
      });
    });
  });

  // Track GitHub icon clicks separately
  document.querySelectorAll('.card-github').forEach(function(icon) {
    icon.addEventListener('click', function() {
      var card = icon.closest('.project-card');
      var title = card ? card.querySelector('.card-title') : null;
      gtag('event', 'project_click', {
        project_name: title ? title.textContent : '',
        click_source: 'github_icon'
      });
    });
  });

  // Track section views via scroll
  var sectionsFired = {};
  var sections = document.querySelectorAll('.snap-section[id]');
  var sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !sectionsFired[entry.target.id]) {
        sectionsFired[entry.target.id] = true;
        gtag('event', 'section_view', {
          section: entry.target.id
        });
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(function(s) { sectionObserver.observe(s); });

  // Track outbound link clicks (resume, social buttons)
  document.querySelectorAll('.banner-social-buttons a, a[href="resume"]').forEach(function(link) {
    link.addEventListener('click', function() {
      var label = link.querySelector('.network-name');
      gtag('event', 'outbound_click', {
        link_url: link.href || '',
        link_label: label ? label.textContent.trim() : 'resume'
      });
    });
  });
})();

