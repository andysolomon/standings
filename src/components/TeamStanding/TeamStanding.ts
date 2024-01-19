import sheet from './TeamStanding.css?inline' assert { type: 'css' };
import logoPNG from './images/logos/nfl_logo_atl.png';

function getImagePath(abbreviation) {
  const basePath = 'src/components/TeamStanding/images/logos/';
  return `${basePath}nfl_logo_${abbreviation}.png`;
}

const nfcEastTeams = [
    {
        teamName: 'Cowboys',
        teamCity: 'Dallas',
        teamAbbr: 'dal',
        teamLogo(){
            return getImagePath('dal');
        } ,
        wins: 5,
        losses: 3,
        ties: 0,
        winPct: 0.625,
        winStreak: 2
    },
    {
        teamName: 'Giants',
        teamCity: 'New York',
        teamAbbr: 'nyg',
        teamLogo(){
            return getImagePath('nyg');
        } ,
        wins: 4,
        losses: 4,
        ties: 0,
        winPct: 0.500,
        winStreak: -1
    },
    {
        teamName: 'Eagles',
        teamCity: 'Philadelphia',
        teamAbbr: 'phi',
        teamLogo(){
            return getImagePath('phi');
        } ,
        wins: 3,
        losses: 5,
        ties: 0,
        winPct: 0.375,
        winStreak: 1
    },
    {
        teamName: 'Commanders',
        teamCity: 'Washington',
        teamAbbr: 'wsh',
        teamLogo(){
            return getImagePath('wsh');
        } ,
        wins: 2,
        losses: 6,
        ties: 0,
        winPct: 0.250,
        winStreak: -3
    }
];

class TeamStanding extends HTMLElement {
    constructor() {
        super();

        // Attach a shadow root to the element.
        this.attachShadow({ mode: 'open' });

        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');
        style.textContent = sheet;

        this.teams = this.getAttribute('teams');

        // Create a div to hold the content
        const div = document.createElement('div');
        div.setAttribute('class', 'teams-by-division');

        // Adding an unnamed slot will allow us to pass in content also known as light DOM
        const slot = document.createElement('slot');
        div.appendChild(slot);

        // Append the div to the shadow root
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(div);
    }

    connectedCallback() {
        this.teamsByDivision();
    }

    teamsByDivision() {
        const contentDiv = this.shadowRoot.querySelector('.teams-by-division');
        if(this.teams === 'nfcEastTeams') {
            const teamNames = nfcEastTeams;
            teamNames.forEach(team => {

                // Create an image element
                const logo = document.createElement('img');
                logo.setAttribute('src', team.teamLogo());
                logo.setAttribute('class', 'team-logo mr-1 ml-1');
                logo.style.width = '32px';

                const teamSpan = document.createElement('span');
                teamSpan.setAttribute('class', 'team-abbr');
                teamSpan.textContent = team.teamAbbr;

                // Create a div to hold the content
                const teamRow = document.createElement('div');
                teamRow.className = 'team-row flex align-center';

                const teamDiv = document.createElement('div');
                teamDiv.className = 'team flex align-center';

                const teamRecordDiv = document.createElement('div');
                const teamBoxStyle = 'team-stat-box flex align-center p-1';
                teamRecordDiv.className = `team-record ${teamBoxStyle}`;
                teamRecordDiv.textContent = `${team.wins}-${team.losses}-${team.ties}`;

                const teamWinPercentageDiv = document.createElement('div');
                teamWinPercentageDiv.className = `team-win-percentage ${teamBoxStyle}`;
                teamWinPercentageDiv.textContent = team.winPct;

                const teamDivisionRecord = document.createElement('div');
                teamDivisionRecord.className = `team-division-record ${teamBoxStyle}`;
                teamDivisionRecord.textContent = `${team.wins}-${team.losses}-${team.ties}`;

                contentDiv.appendChild(teamRow);

                teamRow.appendChild(teamDiv);
                teamRow.appendChild(teamRecordDiv);
                teamRow.appendChild(teamWinPercentageDiv);
                teamRow.appendChild(teamDivisionRecord);

                teamDiv.appendChild(logo);
                teamDiv.appendChild(teamSpan);
            });
        }
    }
}

customElements.define('team-standing', TeamStanding);
