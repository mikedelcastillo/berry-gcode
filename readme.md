# Berry GCode

This is a transpiler that takes GCode generated from Fusion 360 for GRBL and translates it to GCode for my Berry CNC that runs Klipper.

## Installation

```sh
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y git
cd ~
curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | sudo bash -s 19
sudo npm install -g pm2 yarn
git clone https://github.com/mikedelcastillo/berry-gcode.git
mkdir -p ./printer_data/gcodes/raw
mkdir -p ./printer_data/gcodes/processed
cd berry-gcode
yarn
yarn build
pm2 start "INDIR=../printer_data/gcodes/raw OUTDIR=../printer_data/gcodes/processed yarn start" --name "berry-gcode"
sudo pm2 startup
pm2 save
```