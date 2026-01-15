from sys import argv

from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.webdriver import WebDriver
from selenium.webdriver.remote.webelement import WebElement
from webdriver_manager.firefox import GeckoDriverManager

from helper import BColours, abs_path, quote_string, t_grouped_level_order


def handle_quick_nav_elements(top_level_order: list[str], quick_nav_element: WebElement) -> list[str]:
	non_grouped_quick_nav_elements: list[WebElement] = quick_nav_element.find_elements(
		By.CSS_SELECTOR, "div.tsconfig-quick-nav-category ol li a"
	)
	top_level_order += [
		top_level_text
		for non_grouped_quick_nav_element in non_grouped_quick_nav_elements
		if (top_level_text := quote_string(non_grouped_quick_nav_element.text)) not in top_level_order
	]

	return top_level_order


def handle_grouped_quick_nav_elements(
	top_level_order: list[str],
	grouped_level_order: t_grouped_level_order,
	quick_nav_element: WebElement,
) -> tuple[list[str], t_grouped_level_order]:
	top_level_text = quote_string(quick_nav_element.find_element(By.CSS_SELECTOR, "h4 a").text)
	if top_level_text not in top_level_order:
		top_level_order.append(top_level_text)

		grouped_level_order[top_level_text] = []
		category_level_elements: list[WebElement] = quick_nav_element.find_elements(
			By.CSS_SELECTOR, "div.tsconfig-quick-nav-category"
		)
		for category_level_element in category_level_elements:
			category_name: str = quote_string(category_level_element.find_element(By.CSS_SELECTOR, "h5").text)
			category_items: list[str] = [
				quote_string(category_item.text)
				for category_item in category_level_element.find_elements(By.CSS_SELECTOR, "ol li a")
			]
			grouped_level_order[top_level_text].append((category_name, category_items))

	return (top_level_order, grouped_level_order)


def write_order_ts(top_level_order: list[str], grouped_level_order: t_grouped_level_order) -> None:
	top_level_lines: list[str] = ["\n"]
	for top_level_name in top_level_order:
		top_level_lines.append(f"\t{top_level_name},")
		top_level_lines.append("\n")

	grouped_level_lines: list[str] = ["\n"]
	for top_level_name in grouped_level_order:
		grouped_level_lines.append(f"\t{top_level_name.strip('"\'')}: [")
		for category_name, category_items in grouped_level_order[top_level_name]:
			grouped_level_lines.append("\n")
			grouped_level_lines.append(f"\t\t/* {category_name} */")
			for category_item in category_items:
				grouped_level_lines.append("\n")
				grouped_level_lines.append(f"\t\t{category_item},")
			grouped_level_lines.append("\n")
		grouped_level_lines.append("\t],")
		grouped_level_lines.append("\n")

	lines: list[str] = [
		"export const orderTop = [",
		*top_level_lines,
		"] as const",
		"\n",
		"\n",
		"export const orderGrouped = {",
		*grouped_level_lines,
		"} as const",
		"\n",
	]

	order_path: str = abs_path(["..", "plugin", "src", "order.ts"])
	with open(order_path, mode="w", encoding="utf-8") as file:
		file.writelines(lines)
		print("output: order.ts")


def set_grouped_category_lines(  # noqa: PLR0913
	lines: list[str],
	category_name: str,
	category_items: list[str],
	last_category_item_index: int,
	last_index: int,
	index: int,
) -> list[str]:
	lines.append(f"\t/* {category_name} */")
	lines.append("\n")
	for category_index, category_item in enumerate(category_items):
		lines.append(f"\t{category_item},")
		if category_index < last_category_item_index or index < last_index:
			lines.append("\n")
	if index < last_index:
		lines.append("\n")

	return lines


def write_readme(top_level_order: list[str], grouped_level_order: t_grouped_level_order) -> None:  # noqa: C901
	md_start: list[str] = [
		"<!-- webscraping::start -->",
		"\n",
		"### Sorting",
		"\n",
		"\n",
	]
	md_end: list[str] = [
		"Unknown keys, or keys not part of the list above, will be alphabetically sorted and added to the end of the file.",
		"\n",
		"<!-- webscraping::end -->",
	]
	details_start: list[str] = [
		"\n",
		"\n",
		"<details>",
		"\n",
		"<summary>Expand</summary>",
		"\n",
		"\n",
		"```jsonc",
		"\n",
		"[",
		"\n",
	]
	details_end: list[str] = [
		"\n",
		"]",
		"\n",
		"```",
		"\n",
		"\n",
		"</details>",
		"\n",
		"\n",
	]

	top_level_lines: list[str] = []
	last_index = len(top_level_order) - 1
	for index, top_level_name in enumerate(top_level_order):
		top_level_lines.append(f"\t{top_level_name},")
		if index < last_index:
			top_level_lines.append("\n")

	compiler_options_lines: list[str] = []
	watch_options_lines: list[str] = []
	type_acquisition_lines: list[str] = []
	for top_level_name in grouped_level_order:
		top_level_name_stripped = top_level_name.strip("\"'")
		last_index = len(grouped_level_order[top_level_name]) - 1
		for index, (category_name, category_items) in enumerate(grouped_level_order[top_level_name]):
			last_category_item_index = len(category_items) - 1
			if top_level_name_stripped == "compilerOptions":
				compiler_options_lines = set_grouped_category_lines(
					compiler_options_lines, category_name, category_items, last_category_item_index, last_index, index
				)
			elif top_level_name_stripped == "watchOptions":
				watch_options_lines = set_grouped_category_lines(
					watch_options_lines, category_name, category_items, last_category_item_index, last_index, index
				)
			elif top_level_name_stripped == "typeAcquisition":
				type_acquisition_lines = set_grouped_category_lines(
					type_acquisition_lines, category_name, category_items, last_category_item_index, last_index, index
				)

	lines: list[str] = [
		*md_start,
		"Top-level keys are sorted according to the order they appear in [TSConfig reference](https://www.typescriptlang.org/tsconfig/) except for `$schema`, if present, will the be the first key, and `extends`, if present, will be shifted up before the other top-level keys. Known keys, and their order are",
		*details_start,
		*top_level_lines,
		*details_end,
		"`compilerOptions` keys are sorted according to the order they appear in [TSConfig `compilerOptions` reference](https://www.typescriptlang.org/tsconfig/#compilerOptions). Known keys, and their order are",
		*details_start,
		*compiler_options_lines,
		*details_end,
		"`watchOptions` keys are sorted according to the order they appear in [TSConfig `watchOptions` reference](https://www.typescriptlang.org/tsconfig/#watchOptions). Known keys, and their order are",
		*details_start,
		*watch_options_lines,
		*details_end,
		"`typeAcquisition` keys are sorted according to the order they appear in [TSConfig `typeAcquisition` reference](https://www.typescriptlang.org/tsconfig/#typeAcquisition). Known keys, and their order are",
		*details_start,
		*type_acquisition_lines,
		*details_end,
		*md_end,
	]

	file_lines: list[str] = []
	readme_path: str = abs_path(["..", "README.md"])
	with open(readme_path, mode="r", encoding="utf-8") as file:
		to_skip: bool = False
		for line in file.readlines():
			if line.strip("\"'\n\t ") == "<!-- webscraping::start -->":
				to_skip = True
				continue
			if line.strip("\"'\n\t ") == "<!-- webscraping::end -->":
				to_skip = False
				file_lines.extend(lines)
				file_lines.append("\n")
				continue
			if not to_skip:
				file_lines.append(line)
	with open(readme_path, mode="w", encoding="utf-8") as file:
		file.writelines(file_lines)
		print("output: README.md")


def main(driver_path: str | None):
	driver: WebDriver
	driver_options = Options()
	driver_options.add_argument("-headless")
	# https://github.com/mozilla/geckodriver/releases
	if driver_path is None:
		driver = Firefox(service=Service(GeckoDriverManager().install()), options=driver_options)
	else:
		driver = Firefox(service=Service(driver_path), options=driver_options)

	try:
		driver.get("https://www.typescriptlang.org/tsconfig/")
	except Exception as e:
		print(e)
		return
	else:
		top_level_order: list[str] = ['"$schema"', '"extends"']
		grouped_level_order: t_grouped_level_order = {}

		quick_nav_elements: list[WebElement] = driver.find_elements(
			By.CSS_SELECTOR,
			"div.tsconfig.main-content-block div.tsconfig-quick-nav",
		)
		for i, quick_nav_element in enumerate(quick_nav_elements):
			if i == 0:
				top_level_order = handle_quick_nav_elements(top_level_order, quick_nav_element)
			else:
				top_level_order, grouped_level_order = handle_grouped_quick_nav_elements(
					top_level_order, grouped_level_order, quick_nav_element
				)

		write_order_ts(top_level_order, grouped_level_order)
		write_readme(top_level_order, grouped_level_order)
	# try: driver.get("https://www.typescriptlang.org/tsconfig/")
	finally:
		driver.close()
		driver.quit()


if __name__ == "__main__":
	args: list[str] = [arg for arg in argv[1:] if not arg.startswith("-")]
	if len(args) == 0:
		print(f"{BColours.FAIL}python get-keys-order.py <DRIVER_PATH>{BColours.ENDC}")
	else:
		driver_path: str = abs_path(args[0])
		main(driver_path)
