from os import name as os_name
from os import path
from typing import final

IS_WINDOWS = os_name.lower() == "windows"

type t_grouped_level_order = dict[str, list[tuple[str, list[str]]]]


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
