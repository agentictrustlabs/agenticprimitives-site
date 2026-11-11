# (100), 1000 C, 8 h, PMA — scenario B, slow oxidation cooling
SAMPLE Wafer_100_1000C_8h_PMA {
    FAMILY: Si_Planar
    ORIENTATION: Si100
    CLEAN: RCA
    DOPING: p_type
}
CONTROL_TRAJECTORY History {
    EVENT Clean KIND clean TEMP 25 TIMING assumed                # Pre-oxidation clean
    EVENT Load KIND load TEMP 25 TIMING assumed                  # Load into the furnace in nitrogen
    RUN N2_heatup DURATION 5400 TEMP 25->1000 AMBIENT inert_N2 TIMING assumed
    RUN Oxidation DURATION 28800 TEMP 1000->1000 AMBIENT dry_O2 TIMING stated
    # Source TIMING bound: <5 s, PDF p. 6, non-cleanroom set; transfer to this cleanroom wafer is assumed
    RUN PullTravel DURATION 5 TEMP 1000->1000 AMBIENT dry_O2 TIMING assumed
    RUN O2_cool_01 DURATION 7.5 TEMP 1000->800 AMBIENT dry_O2 TIMING assumed
    RUN O2_cool_02 DURATION 16 TEMP 800->600 AMBIENT dry_O2 TIMING assumed
    RUN O2_cool_03 DURATION 41.5 TEMP 600->400 AMBIENT dry_O2 TIMING assumed
    RUN O2_cool_04 DURATION 140 TEMP 400->200 AMBIENT dry_O2 TIMING assumed
    RUN O2_cool_05 DURATION 245 TEMP 200->100 AMBIENT dry_O2 TIMING assumed
    RUN O2_cool_06 DURATION 1050 TEMP 100->25 AMBIENT dry_O2 TIMING assumed
    EVENT Store KIND storage TEMP 25 TIMING assumed              # Stored in a nitrogen dry box
    EVENT Metal KIND metallization TEMP 25 TIMING assumed        # Aluminium evaporated
    RUN FG_heatup DURATION 1800 TEMP 25->400 AMBIENT forming_gas_H2 TIMING assumed
    RUN PostMetalAnneal DURATION 1800 TEMP 400->400 AMBIENT forming_gas_H2 TIMING stated
    RUN FG_cool DURATION 3600 TEMP 400->25 AMBIENT forming_gas_H2 TIMING assumed
    EVENT CV KIND measurement TEMP 25 TIMING assumed             # Capacitance-voltage measurement
}
