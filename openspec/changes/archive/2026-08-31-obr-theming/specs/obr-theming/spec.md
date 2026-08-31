# Spec: obr-theming

## Purpose

Keeps the sheet legible and visually native in both environments it
runs in: it takes its colors from the Owlbear Rodeo theme when running
as an OR extension, and from built-in defaults when running standalone.

## ADDED Requirements

### Requirement: Theme-aware colors

All colors the sheet renders SHALL be derived from the active theme:
inside Owlbear Rodeo, from the theme provided by the OBR SDK theme API
(text and accent colors); standalone, from built-in default values.
No color may be hard-coded to a fixed value that ignores the active
theme.

#### Scenario: Running inside Owlbear Rodeo

- **WHEN** the sheet loads inside an Owlbear Rodeo popover
- **THEN** its text and accent colors match the current OR theme

#### Scenario: Running standalone

- **WHEN** the sheet loads outside Owlbear Rodeo (e.g. vite dev server
  in a browser)
- **THEN** it renders legibly with built-in default colors, with
  sufficient contrast against its own background

### Requirement: Live theme updates

The sheet SHALL apply OR theme changes without a reload.

#### Scenario: OR theme changes while sheet is open

- **WHEN** the user changes the Owlbear Rodeo theme (e.g. switches
  between dark and light mode) while the sheet popover is open
- **THEN** the sheet's colors update to match the new theme without
  closing or reloading the popover

### Requirement: Background transparency

Inside Owlbear Rodeo, the sheet's own background SHALL be transparent
so the popover's semi-transparent surface shows through. Standalone,
the sheet SHALL render an opaque background so its content is legible.

#### Scenario: Popover transparency preserved

- **WHEN** the sheet renders inside an Owlbear Rodeo popover
- **THEN** the sheet paints no background of its own, leaving the OR
  popover surface visually unchanged

#### Scenario: Standalone background

- **WHEN** the sheet renders outside Owlbear Rodeo
- **THEN** it paints an opaque background behind its content
