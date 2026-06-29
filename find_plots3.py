import os
import itertools
import argparse

# 1. SET UP COMMAND LINE ARGUMENTS
parser = argparse.ArgumentParser(description="Find missing S-matrix Bootstrap plots.")
parser.add_argument("--d", type=float, help="Target Dimension (e.g., 6 or 4.5)")
parser.add_argument("--ci", type=int, help="Target CI value (e.g., 0 or 2)")
parser.add_argument("--L", type=int, help="Target Spin L (e.g., 0, 2, 4)")
parser.add_argument("--Nmax", type=int, help="Target Nmax (e.g., 15, 27)")
parser.add_argument("--minmax", type=str, choices=["max", "min"], help="Target minmax ('max' or 'min')")
parser.add_argument("--category", type=str, choices=["Amplitude", "ComplexAmplitude", "ReggeTrajectories"], 
                    help="Target a specific plot category")
parser.add_argument("--format", type=str, choices=["params", "filenames"], default="params", 
                    help="Output style: 'params' for grouped lists (default) or 'filenames' for raw paths")

args = parser.parse_args()

# 2. PARAMETER RANGES
d_values = [args.d] if args.d is not None else [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]
ci_values = [args.ci] if args.ci is not None else [0, 2]
L_values = [args.L] if args.L is not None else [0, 2, 4, 6, 8, 10]
Nmax_values = [args.Nmax] if args.Nmax is not None else list(range(10, 28))
minmax_values = [args.minmax] if args.minmax is not None else ["max", "min"]
lmax = 16

# 3. AUTO IMPROVEMENT MAPPINGS & CATEGORIES
improv_by_d = {
    3: "TH, subTH, ftTH, SPC", 3.5: "TH, SPC", 4: "TH, SPC",
    4.5: "TH, subTH, SPC", 5: "TH, subTH, ftTH, SPC", 5.5: "TH, subTH, SPC",
    6: "TH, subTH, SPC", 6.5: "TH, subTH, SPC", 7: "TH, subTH, ftTH, SPC",
    7.5: "TH, subTH, SPC", 8: "TH, subTH, SPC", 8.5: "TH, subTH, SPC",
    9: "TH, subTH, ftTH, SPC", 9.5: "TH, subTH, SPC", 10: "TH, subTH, SPC",
    10.5: "TH, subTH, SPC", 11: "TH, subTH, ftTH, SPC", 11.5: "TH, subTH, SPC",
    12: "TH, subTH, SPC"
}

# Use the targeted category if provided, otherwise check all three
categories = [args.category] if args.category is not None else ["Amplitude", "ComplexAmplitude", "ReggeTrajectories"]

missing_groups = []
missing_filenames = [] 

# 4. ITERATE AND CHECK
total_combinations = len(d_values) * len(L_values) * len(Nmax_values) * len(ci_values) * len(minmax_values)
print(f"Starting search across {total_combinations} parameter combinations for {len(categories)} categor{'y' if len(categories) == 1 else 'ies'}...")

for d, L, Nmax, ci, minmax in itertools.product(d_values, L_values, Nmax_values, ci_values, minmax_values):
    improv = improv_by_d.get(d, "SPC")
    missing_cats = []
    
    # Format d to remove the .0 if it's an integer
    d_str = f"{d:g}" 
    
    for category in categories:
        filename = f"{category}_d={d_str}_ci={ci}_L={L}_lmax={lmax}_Nmax={Nmax}_minmax={minmax}_improv={{{improv}}}.png"
        filepath = os.path.join("images", category, filename)
        
        if not os.path.exists(filepath):
            missing_cats.append(category)
            missing_filenames.append(filepath) 
            
    if missing_cats:
        missing_groups.append({
            "params": f"d={d_str:<4} | ci={ci} | L={L:<2} | Nmax={Nmax:<2} | minmax={minmax:<3}",
            "missing_cats": missing_cats
        })

# 5. REPORT
print("-" * 80)
if not missing_filenames:
    print("All targeted plots for these exact parameters are present!")
else:
    if args.format == "params":
        print(f"Found {len(missing_groups)} unique parameter groups with missing plots:")
        for group in missing_groups:
            cats_formatted = ", ".join(group['missing_cats'])
            print(f"[{group['params']}] -> Missing: {cats_formatted}")
    
    elif args.format == "filenames":
        print(f"Found {len(missing_filenames)} missing files:")
        for f in missing_filenames:
            print(f"MISSING: {f}")
