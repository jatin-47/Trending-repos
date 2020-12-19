window.onload = fadeOutEffect;
function fadeOutEffect() {
    var fadeTarget = document.getElementById("target");
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 300);
}

// When back arrow is clicked, show previous section
window.onpopstate = function(event) {
    showSection();
}
  function showSection() {
    alert("Use website's buttons only! Don't use browser's navigation buttons.");
}

document.addEventListener('DOMContentLoaded', function() {
    // Send a GET request to the URL
    fetch('https://private-anon-9842aaf4e0-githubtrendingapi.apiary-mock.com/repositories', {
        mode:'cors'
    })
    // Put response into json form
    .then(response => response.json())
    .then(repos => {
        console.log(repos);
        document.getElementById("target").style.display = 'none';
        repos.forEach( (repo) => {
          let item = document.createElement('div');
          item.className = 'repo';
          item.innerHTML = `
            <div class="avatar">
                <img src="${repo.avatar}" alt="photo">
            </div>
            <div class="info">
                <h5 class="author">${repo.author}</h5>
                <h3 class="name">${repo.name}</h3>
                <h5 class="description">${repo.description}<br><a href="${repo.url}">${repo.url}</a></h5>
                <div class="perks">
                    <div>
                        <div class="lang_color" style="background-color: ${repo.languageColor};"></div>
                        <span class="language">${repo.language}</span>
                    </div>
                    <div>
                        <img src="images/star.png" alt="star" class="star">
                        <span class="star_num">${repo.stars}</span>
                    </div>
                    <div>
                        <img src="images/fork.png" alt="fork" class="fork">
                        <span class="fork_num">${repo.forks}</span>
                    </div>
                </div>
            </div>
          `;

          item.addEventListener('click', () => expand(item));

          document.querySelector('#repos').append(item);
        });
    });
});

function expand(repo)
{
    
    let clicked_repo = 0;
    if(repo.querySelector('.description').style.display === 'none' || repo.querySelector('.perks').style.display === 'none')
        clicked_repo = 0;
    else
        clicked_repo = 1;
    
    document.querySelectorAll('.description').forEach((des) => {
        des.style.display = 'none';
    });
    document.querySelectorAll('.perks').forEach((perk) => {
        perk.style.display = 'none';
    });
    document.querySelectorAll('.repo').forEach((item) => {
        item.style.background = '';
        item.style.boxShadow = '';
    });
         
    if(clicked_repo === 0)
    {
        repo.querySelector('.description').style.display = 'block';
        repo.querySelector('.perks').style.display = 'flex';
        repo.style.background = '#ebebeb';
        repo.style.boxShadow = 'inset grey 0px 0px 10px'; 
    }
}