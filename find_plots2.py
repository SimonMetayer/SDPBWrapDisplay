import os
import itertools

# 1. Define the parameter ranges based on your query
d_values = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]
L_values = [0, 2, 4, 6, 8, 10]
Nmax_values = list(range(10, 28))
ci_values = [0, 2]
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
missing_groups = []

# 3. Iterate through all combinations
for d, L, Nmax, ci, minmax in itertools.product(d_values, L_values, Nmax_values, ci_values, minmax_values):
    improv = improv_by_d.get(d, "SPC")
    
    missing_cats = []
    
    # Check all categories for this specific parameter combination
    for category in categories:
        filename = f"{category}_d={d}_ci={ci}_L={L}_lmax={lmax}_Nmax={Nmax}_minmax={minmax}_improv={{{improv}}}.png"
        filepath = os.path.join("images", category, filename)
        
        if not os.path.exists(filepath):
            missing_cats.append(category)
            
    # If any files are missing for these parameters, log the group
    if missing_cats:
        missing_groups.append({
            "params": f"d={d:<4} | ci={ci} | L={L:<2} | Nmax={Nmax:<2} | minmax={minmax:<3}",
            "missing_cats": missing_cats
        })

# 4. Report the nicely formatted findings
print(f"Checking completed. Found {len(missing_groups)} unique parameter groups with missing plots.")
print("-" * 80)

if missing_groups:
    for group in missing_groups:
        cats_formatted = ", ".join(group['missing_cats'])
        print(f"[{group['params']}] -> Missing: {cats_formatted}")
else:
    print("All standard plots for these parameters are present!")
