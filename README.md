# NFL Fantasy Football Comparison

This is a classifier for guessing what players will be better in the 2025 NFL fantasy season. It also includes the code I used to find the best model to predict the 2025 season based off the 2024 season. It's very rough but if you want to compare 2 players you certainly can!

## Requirements
You should only need Docker to run the containers and everything else is handled by them. Only other thing is bash to run the interaction script (or you can just query the server directly)

## Setup
Spin up the containers
```sh 
docker compose up --build
```
Make sure the script is executable
```
chmod +x player-comparison.sh
```
Sync the CSV files with the DB
```
./player-comparison.sh sync
```

## Usage
To compare say Minnesota player Justin Jefferson (#18) and Philadelphia player Saquon Barkley (#26)
```
./player-comparison.sh compare MIN 18 PHI 26
```
Below are the three letter codes used in the DB:
| Name                  | Abbreviation |
|-----------------------|--------------|
| Arizona Cardinals     | ARI          |
| Atlanta Falcons       | ATL          |
| Baltimore Ravens      | BLT          |
| Buffalo Bills         | BUF          |
| Carolina Panthers     | CAR          |
| Chicago Bears         | CHI          |
| Cincinnati Bengals    | CIN          |
| Cleveland Browns      | CLV          |
| Dallas Cowboys        | DAL          |
| Denver Broncos        | DEN          |
| Detroit Lions         | DET          |
| Green Bay Packers     | GB           |
| Houston Texans        | HST          |
| Indianapolis Colts    | IND          |
| Jacksonville Jaguars  | JAX          |
| Kansas City Chiefs    | KC           |
| Las Vegas Raiders     | LV           |
| Los Angeles Chargers  | LAC          |
| Los Angeles Rams      | LAR          |
| Miami Dolphins        | MIA          |
| Minnesota Vikings     | MIN          |
| New England Patriots  | NE           |
| New Orleans Saints    | NO           |
| New York Giants       | NYG          |
| New York Jets         | NYJ          |
| Philadelphia Eagles   | PHI          |
| Pittsburgh Steelers   | PIT          |
| San Francisco 49ers   | SF           |
| Seattle Seahawks      | SEA          |
| Tampa Bay Buccaneers  | TB           |
| Tennessee Titans      | TEN          |
| Washington Commanders | WAS          |

