import os
import itertools

# 1. Define the parameter ranges based on your query
d_values = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]
L_values = [0, 2, 4, 6, 8, 10]  # Even spin integers 0 to 10
Nmax_values = list(range(10, 28)) # 10 to 27 inclusive
ci_values = [0, 2] # Based on the script.js configuration
minmax_values = ["max", "min"]
lmax = 16

# 2. Map the "AUTO" improvement strings exactly as they appear in script.js
improv_by_d = {
    3: "TH, subTH, ftTH, SPC", 3.5: "TH, SPC", 4: "TH, SPC",
    4.5: "TH, subTH, SPC", 5: "TH, subTH, ftTH, SPC", 5.5: "TH, subTH, SPC",
    6: "TH, subTH, SPC", 6.5: "TH, subTH, SPC", 7: "TH, subTH, ftTH, SPC",
    7.5: "TH, subTH, SPC", 8: "TH, subTH, SPC", 8.5: "TH, subTH, SPC",
    9: "TH, subTH, ftTH, SPC", 9.5: "TH, subTH, SPC", 10: "TH, subTH, SPC",
    10.5: "TH, subTH, SPC", 11: "TH, subTH, ftTH, SPC", 11.5: "TH, subTH, SPC",
    12: "TH, subTH, SPC"
}

categories = ["Amplitude", "ComplexAmplitude", "ReggeTrajectories"]
missing_files = []

# 3. Iterate through all combinations
for d, L, Nmax, ci, minmax in itertools.product(d_values, L_values, Nmax_values, ci_values, minmax_values):
    improv = improv_by_d.get(d, "SPC")
    
    for category in categories:
        # Construct the expected filename using your exact template
        filename = f"{category}_d={d}_ci={ci}_L={L}_lmax={lmax}_Nmax={Nmax}_minmax={minmax}_improv={{{improv}}}.png"
        filepath = os.path.join("images", category, filename)
        
        # Check if it exists
        if not os.path.exists(filepath):
            missing_files.append(filepath)

# 4. Report the findings
print(f"Checking completed. Found {len(missing_files)} missing files out of {len(d_values) * len(L_values) * len(Nmax_values) * len(ci_values) * len(minmax_values) * len(categories)} expected standard plots.")
print("-" * 50)

if missing_files:
    for f in missing_files:
        print(f"MISSING: {f}")
else:
    print("All standard plots for these parameters are present!")
