import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "accessoryType", "grinderFields", "accessoryImage",
    "brewingMethods", "otherAccessories", "buttonGroup",
    "name", "brewingButton", "otherButton", "namefield"
  ];

  connect() {
    this.toggleGrinderFields();
  }

  toggleGrinderFields() {
    if (this.accessoryTypeTarget.value === 'Grinder') {
      this.grinderFieldsTargets.forEach(field => field.style.display = 'block');
    } else {
      this.grinderFieldsTargets.forEach(field => field.style.display = 'none');
    }
  }

  select(event) {
    const selectedType = event.currentTarget.dataset.type;
    this.accessoryTypeTarget.value = selectedType;

    // Ensure only one image is selected at a time
    this.accessoryImageTargets.forEach(img => img.classList.remove("selected"));
    event.currentTarget.classList.add("selected");

    // Set the name field value
    this.nameTarget.value = `My ${selectedType}`;
    this.toggleGrinderFields();
  }

  showBrewingMethods(event) {
    this.brewingMethodsTarget.style.display = 'block';
    this.otherAccessoriesTarget.style.display = 'none';
    this.namefieldTarget.style.display = 'block';
    this.nameTarget.value = '';
    this.scrollToBrewingMethods(event);

    // Add "selected" class to brewing button and remove from other button
    this.buttonGroupTargets.forEach(button => button.classList.remove("selected"));
    this.brewingButtonTarget.classList.add("selected");
  }

  showOtherAccessories(event) {
    this.brewingMethodsTarget.style.display = 'none';
    this.otherAccessoriesTarget.style.display = 'block';
    this.namefieldTarget.style.display = 'block';
    this.nameTarget.value = '';
    this.scrollToOtherAccessories(event);

    // Add "selected" class to other button and remove from brewing button
    this.buttonGroupTargets.forEach(button => button.classList.remove("selected"));
    this.otherButtonTarget.classList.add("selected");
  }

  scrollToBrewingMethods(event) {
    this.brewingMethodsTarget.querySelector("h3").scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToOtherAccessories(event) {
    this.otherAccessoriesTarget.querySelector("h3").scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
