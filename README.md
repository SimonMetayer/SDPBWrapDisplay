# SDPBWrap

A user friendly mathematica (MMA) wrapper of the SemiDefinite Program optimizer for Bootstrap (SDPB), plus the useful Memorize tool and S-matrix bootsrap example projects.

## Capabilites provided by SDPBWrap.m

Main functions:
* **Optimizer**: An MMA wrapper for one line usage of SDPB (and eventually other methods): Optimizer[problem..., method...], with methods: "SDPB", "MMAExact", "MMANumerical", "SDPBClusterStart", "SDPBClusterStart", "SDPBCluster".
* **Memorize**: An MMA function that allow automatic storage of functions with lengthy evaluations: Memorize[f][args...]. First run evaluates f[args...] and store the result. Next evaluations retrieve the value from the database. 


## Projects developped in MAIN.nb
* Toy circle problem: proof of concept: 
  * Solve exactly and numerically using pure MMA.
  * Solve using SDPB on local + cluster.
* 1+1d bootrap: basic implementation: 
  * Implement the 2D problem
  * Make almond plot with SDPB
  * Compare with exact result
* 2+1d bootstrap: advanced implementation:
  * Implement the 3D problem
  * Make basic almond plots
  * Make basic amplitude plots
* 3+1d bootstrap: advanced implementation:
  * Implement the 4D problem
  * Solve C0max=2.66
  * Make basic almond plots
  * Make basic amplitude plots
* d>3+1 bootstrap: advanced implementation:
  * Make basic almond plots
  * Make basic amplitude plots
  
## Install
The main package file is SDPBWrap.m, just import it in MMA and use the Optimizer and Memorize functions. 
Please see INSTALL.md for user friendly installation procedure of SDPB and its dependancies on Ubuntu 22.04. 
If PWI+SQL are used, it will generate a database.sqlite file where all grid based functions can be stored.
Required additional file for cluster usage: sdpb_3.x.x.sif.
  
## Results obtained in 3d
<p align="center">
  <img src="images/c2(c0)3d.png" width="400"/>
  <img src="images/c3(c0)3d.png" width="400"/>
</p>
<p align="center">
  <img src="images/c4(c0)3d.png" width="400"/>
  <img src="images/c5(c0)3d.png" width="400"/>
</p>
<p align="center">
  <img src="images/c6(c0)3d.png" width="400"/>
  <img src="images/c3(c0)3d.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)3.dc0min.png" width="400"/>
  <img src="images/S(s,l=0)3.dc0max.png" width="400"/>
</p>
<p align="center">
  <img src="images/C0min(Lmax,Nmax)d=3.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=3.png" width="400"/>
</p>

## Results obtained in 4d
<p align="center">
  <img src="images/c2(c0)4d.png" width="400"/>
  <img src="images/c3(c0)4d.png" width="400"/>
</p>
<p align="center">
  <img src="images/c4(c0)4d.png" width="400"/>
  <img src="images/c5(c0)4d.png" width="400"/>
</p>
<p align="center">
  <img src="images/c6(c0)4d.png" width="400"/>
  <img src="images/c3(c2)4d.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)4.dc0min.png" width="400"/>
  <img src="images/S(s,l=0)4.dc0max.png" width="400"/>
</p>
<p align="center">
  <img src="images/C0min(Lmax,Nmax)d=4.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=4.png" width="400"/>
</p>

## C0max in d=3,...,11
<p align="center">
  <img src="images/c0max(d).png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)3.dc0max.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=3.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)3.5dc0max.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=3.5higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)4.dc0max.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=4.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)4.5dc0max.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=4.5higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)5.dc0max.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=5.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)5.5dc0max.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=5.5higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)6.dc0max.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=6.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)6.5dc0max.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=6.5higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)7.dc0max.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=7.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)8.dc0max.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=8.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)9.dc0max.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=9.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)10.dc0max.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=10.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)11.dc0max.png" width="400"/>
  <img src="images/C0max(Lmax,Nmax)d=11.higherd.png" width="400"/>
</p>

## C0min in d=3,...,11
<p align="center">
  <img src="images/c0min(d).png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)3.dc0min.png" width="400"/>
  <img src="images/C0min(Lmax,Nmax)d=3.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)3.5dc0min.png" width="400"/>
  <img src="images/C0min(Lmax,Nmax)d=3.5higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)4.dc0min.png" width="400"/>
  <img src="images/C0min(Lmax,Nmax)d=4.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)4.5dc0min.png" width="400"/>
  <img src="images/C0min(Lmax,Nmax)d=4.5higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)5.dc0min.png" width="400"/>
  <img src="images/C0min(Lmax,Nmax)d=5.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)5.5dc0min.png" width="400"/>
  <img src="images/C0min(Lmax,Nmax)d=5.5higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)6.dc0min.png" width="400"/>
  <img src="images/C0min(Lmax,Nmax)d=6.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)6.5dc0min.png" width="400"/>
  <img src="images/C0min(Lmax,Nmax)d=6.5higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)7.dc0min.png" width="400"/>
  <img src="images/C0min(Lmax,Nmax)d=7.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)8.dc0min.png" width="400"/>
  <img src="images/C0min(Lmax,Nmax)d=8.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)9.dc0min.png" width="400"/>
  <img src="images/C0min(Lmax,Nmax)d=9.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)10.dc0min.png" width="400"/>
  <img src="images/C0min(Lmax,Nmax)d=10.higherd.png" width="400"/>
</p>
<p align="center">
  <img src="images/S(s,l=0)11.dc0min.png" width="400"/>
  <img src="images/C0min(Lmax,Nmax)d=11.higherd.png" width="400"/>
</p>


