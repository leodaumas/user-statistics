let globalUsers = [];
let globalUserFiltering = [];
let globalFilteredUsers = [];
let ageSum = 0;
let ageMedium = 0;
let mSum = 0;
let fSum = 0;

async function start() {
  console.time('jsonServerInitialize');
  const p1 = promiseUsers();
  await Promise.all([p1]);
  console.timeEnd('jsonServerInitialize');

  hideSpinner();
  globalUserFilter();
  render();
  configFilter();

}

function promiseUsers() {
  return new Promise(async (resolve, reject) => {
    const users = await fetchUsers();

    setTimeout(() => {
      console.log('promiseUsers resolvida');
      resolve(users);
    }, 1000);
  });
}

async function fetchUsers() {
  const response = await fetch('http://localhost:3001/users');
  const json = await response.json();

  globalUsers = json.map(({ name, picture, login, gender, dob }) => {
    return {
      userId: login.uuid,
      userName: name.first + " " + name.last,
      userPicture: picture.large,
      userLastName: name.last,
      userAge: dob.age,
      gender,
    };
  });
}

function hideSpinner() {
  const spinner = document.querySelector('#spinner');

  spinner.classList.add('hide');
}

function globalUserFilter() {
  globalUserFiltering = [];

  globalUsers.forEach((user) => {
    globalUserFiltering.push({
      ...user
    });
  });

  globalUserFiltering.sort((a, b) => a.userName.localeCompare(b.userName));
  globalFilteredUsers = [...globalUserFiltering];
}

function render() {
  renderStatistics();
  const divUsers = document.querySelector('#users');
  const divStatistics = document.querySelector('#statistics');

  divUsers.innerHTML = `
    <div class='row'>
      ${globalFilteredUsers
        .map(({userPicture, userName, userLastName, userAge, gender}) => {
          return `
            <div class='col l6'>
              <div class='flex-row bordered'>
                <img class='avatar' src='${userPicture}' alt='${userName}' />
                <div class='flex-column'>
                <span>${userName},</span>
                <span>${userAge} anos</span>
                 </div>
              </div>
            </div>        
        `;
        })
        .join('')}
    </div>  
  `;

  divStatistics.innerHTML = `
    <div class='row'>
      <div><span>M: ${mSum},</span></div>
      <div><span>F: ${fSum},</span></div>
      <div><span>Soma de idades: ${ageSum},</span></div>
      <div><span>Média de idades: ${ageMedium}</span></div>
    </div>       
 `;
}

function renderStatistics() {
  totalSexoMasc();
  totalSexoFem();
  somaIdades();
  mediaIdades();
}

function configFilter() {
  const buttonFilter = document.querySelector('#buttonFilter');
  const inputFilter = document.querySelector('#inputFilter');

  inputFilter.addEventListener('keyup', handleFilterKeyUp);
  buttonFilter.addEventListener('click', handleButtonClick);
}

function handleButtonClick() {
  const inputFilter = document.querySelector('#inputFilter');
  const filterValue = inputFilter.value.toLowerCase().trim();

  globalFilteredUsers = globalUserFiltering.filter((item) => {
    return item.userName.toLowerCase().includes(filterValue);
  });

  render();
}

function handleFilterKeyUp({ key }) {
  //const { key } = event;

  if (key !== 'Enter') {
    return;
  }

  handleButtonClick();
}


function totalSexoMasc() {
  mSum = globalFilteredUsers.reduce((accumulator, current) => {
    return accumulator + (current.gender.match(new RegExp("male", "y")) || []).length;
  },0);
}

function totalSexoFem() {
  fSum = globalFilteredUsers.reduce((accumulator, current) => {
    return accumulator + (current.gender.match(new RegExp("female", "y")) || []).length;
  },0);
}

function somaIdades() {
  ageSum = globalFilteredUsers.reduce((accumulator, current) => { 
    return accumulator + current.userAge;
  },0);
}

function mediaIdades() {
  ageMedium = ageSum/(globalFilteredUsers.length);
  return;
}

start();
