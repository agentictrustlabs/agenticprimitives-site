# (100), 1000 C, 8 h, PMA — scenario A, fast oxidation cooling
SAMPLE Wafer_100_1000C_8h_PMA {
    FAMILY: Si_Planar
    ORIENTATION: Si100
    CLEAN: RCA
    DOPING: p_type
}
CONTROL_TRAJECTORY History {
    EVENT Clean KIND clean TEMP 25 TIMING assumed                # Pre-oxidation clean
    EVENT Load KIND load TEMP 25 TIMING assumed                  # Load into the furnace in nitrogen
    RUN N2_heatup_01 DURATION 15 TEMP 25->359.494 AMBIENT inert_N2 TIMING assumed
    RUN N2_heatup_02 DURATION 15 TEMP 359.494->580.006 AMBIENT inert_N2 TIMING assumed
    RUN N2_heatup_03 DURATION 15 TEMP 580.006->725.377 AMBIENT inert_N2 TIMING assumed
    RUN N2_heatup_04 DURATION 15 TEMP 725.377->821.211 AMBIENT inert_N2 TIMING assumed
    RUN N2_heatup_05 DURATION 15 TEMP 821.211->884.389 AMBIENT inert_N2 TIMING assumed
    RUN N2_heatup_06 DURATION 15 TEMP 884.389->926.038 AMBIENT inert_N2 TIMING assumed
    RUN N2_heatup_07 DURATION 15 TEMP 926.038->953.495 AMBIENT inert_N2 TIMING assumed
    RUN N2_heatup_08 DURATION 15 TEMP 953.495->971.596 AMBIENT inert_N2 TIMING assumed
    RUN N2_heatup_09 DURATION 15 TEMP 971.596->983.529 AMBIENT inert_N2 TIMING assumed
    RUN N2_heatup_10 DURATION 15 TEMP 983.529->991.395 AMBIENT inert_N2 TIMING assumed
    RUN N2_heatup_11 DURATION 15 TEMP 991.395->996.581 AMBIENT inert_N2 TIMING assumed
    RUN N2_heatup_12 DURATION 15 TEMP 996.581->1000 AMBIENT inert_N2 TIMING assumed
    RUN Oxidation DURATION 28800 TEMP 1000->1000 AMBIENT dry_O2 TIMING stated
    # Source TIMING bound: <5 s, PDF p. 6, non-cleanroom set; transfer to this cleanroom wafer is assumed
    RUN PullTravel DURATION 5 TEMP 1000->1000 AMBIENT dry_O2 TIMING assumed
    RUN O2_cool_01 DURATION 1.5 TEMP 1000->800 AMBIENT dry_O2 TIMING assumed
    RUN O2_cool_02 DURATION 3.2 TEMP 800->600 AMBIENT dry_O2 TIMING assumed
    RUN O2_cool_03 DURATION 8.3 TEMP 600->400 AMBIENT dry_O2 TIMING assumed
    RUN O2_cool_04 DURATION 28 TEMP 400->200 AMBIENT dry_O2 TIMING assumed
    RUN O2_cool_05 DURATION 49 TEMP 200->100 AMBIENT dry_O2 TIMING assumed
    RUN O2_cool_06 DURATION 210 TEMP 100->25 AMBIENT dry_O2 TIMING assumed
    EVENT Store KIND storage TEMP 25 TIMING assumed              # Stored in a nitrogen dry box
    EVENT Metal KIND metallization TEMP 25 TIMING assumed        # Aluminium evaporated
    RUN FG_heatup_01 DURATION 15 TEMP 25->153.652 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_heatup_02 DURATION 15 TEMP 153.652->238.464 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_heatup_03 DURATION 15 TEMP 238.464->294.376 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_heatup_04 DURATION 15 TEMP 294.376->331.235 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_heatup_05 DURATION 15 TEMP 331.235->355.534 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_heatup_06 DURATION 15 TEMP 355.534->371.553 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_heatup_07 DURATION 15 TEMP 371.553->382.114 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_heatup_08 DURATION 15 TEMP 382.114->389.075 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_heatup_09 DURATION 15 TEMP 389.075->393.665 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_heatup_10 DURATION 15 TEMP 393.665->396.69 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_heatup_11 DURATION 15 TEMP 396.69->398.685 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_heatup_12 DURATION 15 TEMP 398.685->400 AMBIENT forming_gas_H2 TIMING assumed
    RUN PostMetalAnneal DURATION 1800 TEMP 400->400 AMBIENT forming_gas_H2 TIMING stated
    RUN FG_cool_01 DURATION 50 TEMP 400->271.348 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_cool_02 DURATION 50 TEMP 271.348->186.536 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_cool_03 DURATION 50 TEMP 186.536->130.624 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_cool_04 DURATION 50 TEMP 130.624->93.765 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_cool_05 DURATION 50 TEMP 93.765->69.4658 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_cool_06 DURATION 50 TEMP 69.4658->53.4468 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_cool_07 DURATION 50 TEMP 53.4468->42.8865 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_cool_08 DURATION 50 TEMP 42.8865->35.9246 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_cool_09 DURATION 50 TEMP 35.9246->31.3351 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_cool_10 DURATION 50 TEMP 31.3351->28.3095 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_cool_11 DURATION 50 TEMP 28.3095->26.3149 AMBIENT forming_gas_H2 TIMING assumed
    RUN FG_cool_12 DURATION 50 TEMP 26.3149->25 AMBIENT forming_gas_H2 TIMING assumed
    EVENT CV KIND measurement TEMP 25 TIMING assumed             # Capacitance-voltage measurement
}
