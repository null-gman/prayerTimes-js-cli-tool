# prayerTimes-js-cli-tool

A simple CLI tool that provides  prayer times for  specified location .

# RESTful API service provided by

- [aladhan.com](https://aladhan.com/prayer-times-api)
  
# Usage

## Daily Prayer Times Caching

The program caches the prayer times for each day in a file named `prayTimes.json`.

- **By default**, it looks for `prayTimes.json` in the **current working directory**.
- To use a custom path, pass the `-pytm <file path>` flag (short for **pray time**).

The program fetches the prayer times from an API **once per day** and stores the response in the specified file.

If the file is not found or the data is corrupted, a new API request will be made to retrieve fresh prayer times.

Caching the data helps reduce unnecessary API calls, which improves the overall performance and efficiency of the application.
## run the program
1. To run the program, install Node.js.
2. Then run: `npm start`.
3. Alternatively, from the root directory, run: `node main.js`.

## Change the Location
- The default location is `"Alexandria"`.

### To change it:
1. Go to **main.js**.
2. Find the global variable `const Location = "Alexandria";`.
3. Change the string to your desired location.
> may the location you insert doesn't work, be sure to test it.

### Using the Script as a CLI Tool from the Terminal  

#### For Linux:  
1. Create a file named **pray.sh**.  
2. Insert the following line inside it:  
   ```bash
   node <path-to-the-script>/main.js
   ```  
3. Save the file and make it executable by running:  
   ```bash
   chmod +x pray.sh
   ```  

#### For Windows:  
1. Create a file named **pray.bat**.  
2. Insert the following line inside it:  
   ```batch(cmd/powershell)
   node <path-to-the-script>\main.js
   ```  
3. Save the file.  

#### Notes:  
- The file extension is not required when running the script on both .  
- To execute it from any directory in the terminal, add the file to a directory included in the system's `PATH` variable.

## DEMO
1. open terminal
2. run
```
pray
```
> be sure to add the file into `PATH` variable to execute it from any directory .
3. ![image](https://github.com/user-attachments/assets/63f264f2-adfe-4ffc-a4e8-a59aaea17b28)

> **NOTE:** If you disconnected from the internet or the server goes down, an error message will occur.
