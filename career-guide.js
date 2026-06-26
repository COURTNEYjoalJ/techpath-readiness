(function () {
  const data = window.careerGuideData;
  const countrySelect = document.getElementById("countrySelect");
  const roleSelect = document.getElementById("roleSelect");
  const skillTableArea = document.getElementById("skillTableArea");

  if (!data || !countrySelect || !roleSelect || !skillTableArea) {
    return;
  }

  function clearSkillArea() {
    skillTableArea.innerHTML = "";
  }

  function renderMessage(message) {
    clearSkillArea();

    const panel = document.createElement("div");
    panel.className = "guide-placeholder";

    const text = document.createElement("p");
    text.textContent = message;

    panel.appendChild(text);
    skillTableArea.appendChild(panel);
  }

  function createCell(text, tagName) {
    const cell = document.createElement(tagName);
    cell.textContent = text;
    return cell;
  }

  function renderSkillTable(countryKey, roleKey) {
    const country = data.countries[countryKey];
    const role = data.roles[roleKey];

    if (!role) {
      const selectedRole = roleSelect.options[roleSelect.selectedIndex].text;
      renderMessage(`${selectedRole} guidance is coming soon. Select Data Scientist or Data Analyst for now.`);
      return;
    }

    clearSkillArea();

    const panel = document.createElement("div");
    panel.className = "guide-placeholder skill-table-panel";

    const heading = document.createElement("div");
    heading.className = "skill-table-heading";

    const title = document.createElement("h2");
    title.textContent = `${role.label} Skill Roadmap`;

    const summary = document.createElement("p");
    summary.textContent = `${country.label} selected. Skill weights total ${role.totalWeight}.`;

    heading.appendChild(title);
    heading.appendChild(summary);

    const tableWrap = document.createElement("div");
    tableWrap.className = "skill-table-wrap";

    const table = document.createElement("table");
    table.className = "skill-table";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Skill", "Required Topics", "Why It Matters", "Weight", "Score", "Action"].forEach((column) => {
      headerRow.appendChild(createCell(column, "th"));
    });
    thead.appendChild(headerRow);

    const tbody = document.createElement("tbody");
    role.skills.forEach((skill) => {
      const row = document.createElement("tr");
      row.appendChild(createCell(skill.name, "td"));
      row.appendChild(createCell(skill.requiredTopics.join(", "), "td"));
      row.appendChild(createCell(skill.reason, "td"));
      row.appendChild(createCell(`${skill.weight}`, "td"));
      row.appendChild(createCell("Not tested", "td"));

      const actionCell = document.createElement("td");
      const actionButton = document.createElement("button");
      actionButton.className = "disabled-test-button";
      actionButton.type = "button";
      actionButton.disabled = true;
      actionButton.textContent = "Test coming next";
      actionCell.appendChild(actionButton);
      row.appendChild(actionCell);

      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    panel.appendChild(heading);
    panel.appendChild(tableWrap);
    skillTableArea.appendChild(panel);
  }

  function updateGuide() {
    const countryKey = countrySelect.value;
    const roleKey = roleSelect.value;

    if (!countryKey || !roleKey) {
      renderMessage("Select a country and role to view your skill roadmap.");
      return;
    }

    renderSkillTable(countryKey, roleKey);
  }

  function setDropdownOpen(dropdown, isOpen) {
    const trigger = dropdown.querySelector(".custom-dropdown-trigger");

    dropdown.classList.toggle("open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));
  }

  function closeCustomDropdowns(exceptDropdown) {
    document.querySelectorAll("[data-custom-select]").forEach((dropdown) => {
      if (dropdown !== exceptDropdown) {
        setDropdownOpen(dropdown, false);
      }
    });
  }

  function syncCustomDropdown(dropdown) {
    const select = document.getElementById(dropdown.dataset.selectId);
    const valueText = dropdown.querySelector(".custom-dropdown-value");
    const selectedOption = select.options[select.selectedIndex];

    valueText.textContent = selectedOption ? selectedOption.text : "";

    dropdown.querySelectorAll("[data-value]").forEach((option) => {
      const isSelected = option.dataset.value === select.value;
      option.classList.toggle("selected", isSelected);
      option.setAttribute("aria-selected", String(isSelected));
    });
  }

  function focusOption(dropdown, direction) {
    const options = Array.from(dropdown.querySelectorAll("[data-value]"));
    const currentIndex = options.indexOf(document.activeElement);
    const nextIndex = currentIndex === -1
      ? 0
      : (currentIndex + direction + options.length) % options.length;

    options[nextIndex].focus();
  }

  function setupCustomDropdowns() {
    document.querySelectorAll("[data-custom-select]").forEach((dropdown) => {
      const select = document.getElementById(dropdown.dataset.selectId);
      const trigger = dropdown.querySelector(".custom-dropdown-trigger");

      syncCustomDropdown(dropdown);
      select.addEventListener("change", () => syncCustomDropdown(dropdown));

      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = dropdown.classList.contains("open");
        closeCustomDropdowns(dropdown);
        setDropdownOpen(dropdown, !isOpen);
      });

      trigger.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          closeCustomDropdowns(dropdown);
          setDropdownOpen(dropdown, true);
          focusOption(dropdown, 1);
        }

        if (event.key === "Escape") {
          setDropdownOpen(dropdown, false);
        }
      });

      dropdown.querySelectorAll("[data-value]").forEach((option) => {
        option.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();

          select.value = option.dataset.value;
          syncCustomDropdown(dropdown);
          select.dispatchEvent(new Event("change", { bubbles: true }));
          setDropdownOpen(dropdown, false);
          trigger.focus();
        });

        option.addEventListener("keydown", (event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            focusOption(dropdown, 1);
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            focusOption(dropdown, -1);
          }

          if (event.key === "Escape") {
            setDropdownOpen(dropdown, false);
            trigger.focus();
          }
        });
      });
    });

    document.addEventListener("click", () => {
      closeCustomDropdowns();
    });
  }

  setupCustomDropdowns();
  countrySelect.addEventListener("change", updateGuide);
  roleSelect.addEventListener("change", updateGuide);
  updateGuide();
})();
