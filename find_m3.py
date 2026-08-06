import os
import itertools
import argparse

# 1. SET UP COMMAND LINE ARGUMENTS
parser = argparse.ArgumentParser(description="Find and count M(s,t,u) text files.")
parser.add_argument("--d", type=float, help="Target Dimension (e.g., 6 or 4.5)")
parser.add_argument("--ci", type=int, help="Target CI value (e.g., 0 or 2)")
parser.add_argument("--L", type=int, help="Target Spin L (e.g., 0, 2, 4)")
parser.add_argument("--Nmax", type=int, help="Target Nmax (e.g., 15, 30)")
parser.add_argument("--minmax", type=str, choices=["max", "min"], help="Target minmax ('max' or 'min')")
parser.add_argument("--format", type=str, choices=["params", "filenames"], default="params", 
                    help="Output style: 'params' for parameter lists (default) or 'filenames' for raw paths")

args = parser.parse_args()

# 2. PARAMETER RANGES
d_values = [args.d] if args.d is not None else [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]
ci_values = [args.ci] if args.ci is not None else [0, 2]
L_values = [args.L] if args.L is not None else [0, 2, 4, 6, 8, 10]
Nmax_values = [args.Nmax] if args.Nmax is not None else list(range(10, 31))
minmax_values = [args.minmax] if args.minmax is not None else ["max", "min"]
lmax = 16

# 3. AUTO IMPROVEMENT MAPPINGS
improv_by_d = {
    3: "TH, subTH, ftTH, SPC", 3.5: "TH, SPC", 4: "TH, SPC",
    4.5: "TH, subTH, SPC", 5: "TH, subTH, ftTH, SPC", 5.5: "TH, subTH, SPC",
    6: "TH, subTH, SPC", 6.5: "TH, subTH, SPC", 7: "TH, subTH, ftTH, SPC",
    7.5: "TH, subTH, SPC", 8: "TH, subTH, SPC", 8.5: "TH, subTH, SPC",
    9: "TH, subTH, ftTH, SPC", 9.5: "TH, subTH, SPC", 10: "TH, subTH, SPC",
    10.5: "TH, subTH, SPC", 11: "TH, subTH, ftTH, SPC", 11.5: "TH, subTH, SPC",
    12: "TH, subTH, SPC"
}

found_params = []
missing_params = []
found_filenames = []
missing_filenames = []

# 4. ITERATE AND CHECK
total_combinations = len(d_values) * len(L_values) * len(Nmax_values) * len(ci_values) * len(minmax_values)
print(f"Starting search across {total_combinations} parameter combinations...")

base_folder = os.path.join("data", "M")

for d, L, Nmax, ci, minmax in itertools.product(d_values, L_values, Nmax_values, ci_values, minmax_values):
    improv = improv_by_d.get(d, "SPC")
    
    # Format d to remove the .0 if it's an integer
    d_str = f"{d:g}" 
    
    # Construct filename
    filename = f"M_d={d_str}_ci={ci}_L={L}_lmax={lmax}_Nmax={Nmax}_minmax={minmax}_improv={{{improv}}}.txt"
    filepath = os.path.join(base_folder, filename)
    
    # Format parameter string for clean output
    param_str = f"d={d_str:<4} | ci={ci} | L={L:<2} | Nmax={Nmax:<2} | minmax={minmax:<3}"
    
    if os.path.exists(filepath):
        found_filenames.append(filepath)
        found_params.append(param_str)
    else:
        missing_filenames.append(filepath)
        missing_params.append(param_str)

# 5. REPORT
print("-" * 80)
print(f"Search complete for folder: {base_folder}")
print(f"Files found:   {len(found_filenames)}")
print(f"Files missing: {len(missing_filenames)}")
print("-" * 80)

# Output logic based on formatting flag (Missing file outputs removed)
if args.format == "params":
    if found_params:
        print(f"\n--- FOUND FILES ({len(found_params)}) ---")
        for p in found_params:
            print(f"[{p}]")

elif args.format == "filenames":
    if found_filenames:
        print(f"\n--- FOUND FILES ({len(found_filenames)}) ---")
        for f in found_filenames:
            print(f"FOUND: {f}")
