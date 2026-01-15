from os import name as os_name
from os import path
from typing import final

from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.webdriver import WebDriver
from webdriver_manager.firefox import GeckoDriverManager

IS_WINDOWS = os_name.lower() == "windows"

type t_grouped_level_order = dict[str, list[tuple[str, list[str]]]]


def init_webdriver(driver_path: str | None) -> WebDriver:
	driver_options = Options()
	driver_options.add_argument("-headless")

	# https://github.com/mozilla/geckodriver/releases
	if driver_path is None or not path.exists(driver_path):
		return Firefox(service=Service(GeckoDriverManager().install()), options=driver_options)
	else:
		return Firefox(service=Service(driver_path), options=driver_options)


def quote_string(s: str) -> str:
	"""
	- strips away any single quotes or double quotes
	- adds double quotes
	"""
	s = s.strip("\"'")
	return f'"{s}"'


def abs_path(p: str | list[str]) -> str:
	if isinstance(p, str):
		return path.abspath(path.expanduser(path.normpath(p)))

	return path.abspath(path.expanduser(path.normpath(path.join(*p))))


# https://stackoverflow.com/a/287944/7641789
@final
class BColours:
	HEADER = "\033[95m"
	OKBLUE = "\033[94m"
	OKCYAN = "\033[96m"
	OKGREEN = "\033[92m"
	WARNING = "\033[93m"
	FAIL = "\033[91m"
	ENDC = "\033[0m"
	BOLD = "\033[1m"
	UNDERLINE = "\033[4m"


if __name__ == "__main__":
	pass
